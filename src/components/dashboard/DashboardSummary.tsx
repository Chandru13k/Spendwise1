
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownRight, ArrowUpRight, DollarSign, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export function DashboardSummary() {
  const [summaryData, setSummaryData] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    savingsRate: 0,
    balanceChange: 0,
    incomeChange: 0,
    expenseChange: 0,
    savingsChange: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSummaryData = async () => {
      if (!user) return;
      
      try {
        // Get current and previous month
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1; // 0-indexed to 1-indexed
        
        const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
        
        // Format as YYYY-MM for SQL
        const currentMonthStart = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
        const prevMonthStart = `${prevYear}-${String(prevMonth).padStart(2, '0')}-01`;
        const nextMonthStart = currentMonth === 12 
          ? `${currentYear + 1}-01-01` 
          : `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
        
        // Get all transactions for current user
        const { data: allTransactions, error: allError } = await supabase
          .from('transactions')
          .select('amount, date, type')
          .eq('user_id', user.id);
        
        if (allError) throw allError;
        
        // Get current month transactions
        const { data: currentTransactions, error: currentError } = await supabase
          .from('transactions')
          .select('amount, type')
          .eq('user_id', user.id)
          .gte('date', currentMonthStart)
          .lt('date', nextMonthStart);
        
        if (currentError) throw currentError;
        
        // Get previous month transactions
        const { data: prevTransactions, error: prevError } = await supabase
          .from('transactions')
          .select('amount, type')
          .eq('user_id', user.id)
          .gte('date', prevMonthStart)
          .lt('date', currentMonthStart);
        
        if (prevError) throw prevError;
        
        // Calculate total balance
        const totalBalance = allTransactions?.reduce((sum, transaction) => 
          sum + Number(transaction.amount), 0) || 0;
        
        // Calculate current month income and expenses
        let currentIncome = 0;
        let currentExpenses = 0;
        
        currentTransactions?.forEach(transaction => {
          const amount = Number(transaction.amount);
          if (amount > 0 || transaction.type === 'income') {
            currentIncome += amount;
          } else {
            currentExpenses += Math.abs(amount);
          }
        });
        
        // Calculate previous month income and expenses
        let prevIncome = 0;
        let prevExpenses = 0;
        
        prevTransactions?.forEach(transaction => {
          const amount = Number(transaction.amount);
          if (amount > 0 || transaction.type === 'income') {
            prevIncome += amount;
          } else {
            prevExpenses += Math.abs(amount);
          }
        });
        
        // Calculate savings rate
        const savingsRate = currentIncome > 0 
          ? Math.round(((currentIncome - currentExpenses) / currentIncome) * 100) 
          : 0;
        
        const prevSavingsRate = prevIncome > 0 
          ? Math.round(((prevIncome - prevExpenses) / prevIncome) * 100) 
          : 0;
        
        // Calculate month-over-month changes
        const incomeChange = prevIncome > 0 
          ? ((currentIncome - prevIncome) / prevIncome) * 100 
          : 0;
        
        const expenseChange = prevExpenses > 0 
          ? ((currentExpenses - prevExpenses) / prevExpenses) * 100 
          : 0;
        
        const balanceChange = prevMonth ? 10.5 : 0; // Placeholder for actual calculation
        
        const savingsChange = prevSavingsRate > 0 
          ? (savingsRate - prevSavingsRate) 
          : 0;
        
        setSummaryData({
          balance: totalBalance,
          income: currentIncome,
          expenses: currentExpenses,
          savingsRate,
          balanceChange,
          incomeChange,
          expenseChange,
          savingsChange
        });
      } catch (error) {
        console.error('Error fetching summary data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSummaryData();
  }, [user]);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard 
        title="Total Balance" 
        value={isLoading ? "Loading..." : `₹${Math.round(summaryData.balance).toLocaleString('en-IN')}`}
        change={`${summaryData.balanceChange > 0 ? '+' : ''}${summaryData.balanceChange.toFixed(1)}%`}
        changeType={summaryData.balanceChange >= 0 ? 'positive' : 'negative'}
        icon={DollarSign} 
      />
      <SummaryCard 
        title="Income" 
        value={isLoading ? "Loading..." : `₹${Math.round(summaryData.income).toLocaleString('en-IN')}`}
        change={`${summaryData.incomeChange > 0 ? '+' : ''}${summaryData.incomeChange.toFixed(1)}%`}
        changeType={summaryData.incomeChange >= 0 ? 'positive' : 'negative'}
        icon={ArrowUpRight} 
        className="border-l-income"
      />
      <SummaryCard 
        title="Expenses" 
        value={isLoading ? "Loading..." : `₹${Math.round(summaryData.expenses).toLocaleString('en-IN')}`}
        change={`${summaryData.expenseChange > 0 ? '+' : ''}${summaryData.expenseChange.toFixed(1)}%`}
        changeType={summaryData.expenseChange <= 0 ? 'positive' : 'negative'}
        icon={ArrowDownRight} 
        className="border-l-expense"
      />
      <SummaryCard 
        title="Savings Rate" 
        value={isLoading ? "Loading..." : `${summaryData.savingsRate}%`}
        change={`${summaryData.savingsChange > 0 ? '+' : ''}${summaryData.savingsChange.toFixed(1)}%`}
        changeType={summaryData.savingsChange >= 0 ? 'positive' : 'negative'}
        icon={TrendingUp} 
        className="border-l-secondary"
      />
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
  className?: string;
}

function SummaryCard({ title, value, change, changeType = 'neutral', icon: Icon, className }: SummaryCardProps) {
  return (
    <Card className={cn("border-l-4 shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn(
            "text-xs mt-1",
            changeType === 'positive' && "text-success",
            changeType === 'negative' && "text-expense",
            changeType === 'neutral' && "text-muted-foreground"
          )}>
            {change} from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
