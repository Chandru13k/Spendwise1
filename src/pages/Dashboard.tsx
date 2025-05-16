
import React, { useEffect, useState } from 'react';
import { DashboardSummary } from '@/components/dashboard/DashboardSummary';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { ExpenseOverview } from '@/components/dashboard/ExpenseOverview';
import { IncomeExpenseChart } from '@/components/dashboard/IncomeExpenseChart';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function Dashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [hasDefaultData, setHasDefaultData] = useState(false);

  // Check if user already has default data
  useEffect(() => {
    const checkDefaultData = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('id')
          .eq('user_id', user.id)
          .eq('is_default', true)
          .limit(1);

        if (error) throw error;

        setHasDefaultData(data && data.length > 0);
      } catch (error: any) {
        console.error('Error checking default data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkDefaultData();
  }, [user]);

  // Add default January to April data if user doesn't have it yet
  useEffect(() => {
    const addDefaultData = async () => {
      if (isLoading || hasDefaultData || !user) return;
      
      try {
        // Create default transactions for January to April with explicit IDs
        const defaultTransactions = [
          // January
          { id: 1, title: 'Salary', amount: 75000, date: '2025-01-15', category: 'Income', type: 'income', user_id: user.id, is_default: true },
          { id: 2, title: 'Rent', amount: -15000, date: '2025-01-05', category: 'Housing', type: 'expense', user_id: user.id, is_default: true },
          { id: 3, title: 'Groceries', amount: -12000, date: '2025-01-12', category: 'Food', type: 'expense', user_id: user.id, is_default: true },
          { id: 4, title: 'Utilities', amount: -5000, date: '2025-01-18', category: 'Bills', type: 'expense', user_id: user.id, is_default: true },
          { id: 5, title: 'Dining Out', amount: -6000, date: '2025-01-25', category: 'Dining', type: 'expense', user_id: user.id, is_default: true },
          
          // February
          { id: 6, title: 'Salary', amount: 75000, date: '2025-02-15', category: 'Income', type: 'income', user_id: user.id, is_default: true },
          { id: 7, title: 'Rent', amount: -15000, date: '2025-02-05', category: 'Housing', type: 'expense', user_id: user.id, is_default: true },
          { id: 8, title: 'Groceries', amount: -11500, date: '2025-02-10', category: 'Food', type: 'expense', user_id: user.id, is_default: true },
          { id: 9, title: 'Utilities', amount: -4800, date: '2025-02-18', category: 'Bills', type: 'expense', user_id: user.id, is_default: true },
          { id: 10, title: 'Dining Out', amount: -5500, date: '2025-02-22', category: 'Dining', type: 'expense', user_id: user.id, is_default: true },
          
          // March
          { id: 11, title: 'Salary', amount: 75000, date: '2025-03-15', category: 'Income', type: 'income', user_id: user.id, is_default: true },
          { id: 12, title: 'Rent', amount: -15000, date: '2025-03-05', category: 'Housing', type: 'expense', user_id: user.id, is_default: true },
          { id: 13, title: 'Groceries', amount: -12200, date: '2025-03-11', category: 'Food', type: 'expense', user_id: user.id, is_default: true },
          { id: 14, title: 'Utilities', amount: -5100, date: '2025-03-18', category: 'Bills', type: 'expense', user_id: user.id, is_default: true },
          { id: 15, title: 'Dining Out', amount: -6200, date: '2025-03-24', category: 'Dining', type: 'expense', user_id: user.id, is_default: true },
          
          // April
          { id: 16, title: 'Salary', amount: 75000, date: '2025-04-15', category: 'Income', type: 'income', user_id: user.id, is_default: true },
          { id: 17, title: 'Rent', amount: -15000, date: '2025-04-05', category: 'Housing', type: 'expense', user_id: user.id, is_default: true },
          { id: 18, title: 'Groceries', amount: -11800, date: '2025-04-09', category: 'Food', type: 'expense', user_id: user.id, is_default: true },
          { id: 19, title: 'Utilities', amount: -5000, date: '2025-04-18', category: 'Bills', type: 'expense', user_id: user.id, is_default: true },
          { id: 20, title: 'Dining Out', amount: -5900, date: '2025-04-27', category: 'Dining', type: 'expense', user_id: user.id, is_default: true }
        ];

        // Use upsert to avoid conflicts with existing IDs
        const { error } = await supabase
          .from('transactions')
          .upsert(defaultTransactions, { onConflict: 'id' });

        if (error) throw error;
        
        toast.success('Default transaction data has been loaded.');
        setHasDefaultData(true);
      } catch (error: any) {
        console.error('Error adding default data:', error.message);
        toast.error('Failed to load default data.');
      }
    };

    addDefaultData();
  }, [isLoading, hasDefaultData, user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
      </div>
      
      <DashboardSummary />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <IncomeExpenseChart />
        <ExpenseOverview />
      </div>
      
      <RecentTransactions />
    </div>
  );
}
