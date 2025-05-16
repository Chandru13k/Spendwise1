
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, CalendarIcon, Search, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';

export function TransactionPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useAuth();

  // Fetch transactions from Supabase
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        const transactionsData = data || [];
        setTransactions(transactionsData);
        setFilteredTransactions(transactionsData);
        
        // Calculate monthly income and expenses
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const currentMonthStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
        
        const monthlyTransactions = transactionsData.filter(t => 
          t.date && t.date.startsWith(currentMonthStr)
        );
        
        const income = monthlyTransactions
          .filter(t => Number(t.amount) > 0)
          .reduce((sum, t) => sum + Number(t.amount), 0);
        
        const expenses = monthlyTransactions
          .filter(t => Number(t.amount) < 0)
          .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);
        
        setMonthlyIncome(income);
        setMonthlyExpenses(expenses);
        setShowAlert(expenses > income);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTransactions();
    
    // Set up real-time subscription for updates
    const channel = supabase
      .channel('db-changes')
      .on('postgres_changes', 
        {
          event: '*',
          schema: 'public',
          table: 'transactions',
          filter: `user_id=eq.${user?.id}`
        }, 
        () => {
          fetchTransactions();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Filter transactions based on search, category and date
  useEffect(() => {
    let results = transactions;
    
    if (searchTerm) {
      results = results.filter(transaction => 
        transaction.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (category !== 'all') {
      results = results.filter(transaction => 
        transaction.category === category
      );
    }
    
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      results = results.filter(transaction => 
        transaction.date === dateString
      );
    }
    
    setFilteredTransactions(results);
  }, [searchTerm, category, date, transactions]);

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link to="/app/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage your transactions</p>
        </div>
      </div>
      
      {showAlert && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Your expenses (₹{monthlyExpenses.toLocaleString('en-IN')}) exceed your income 
            (₹{monthlyIncome.toLocaleString('en-IN')}) for this month. 
            <Button 
              variant="link" 
              className="p-0 h-auto ml-1" 
              onClick={() => toast.message("You can set your salary in the Profile Settings")}
            >
              Set your salary
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="Housing">Housing</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Transportation">Transportation</SelectItem>
                <SelectItem value="Utilities">Utilities</SelectItem>
                <SelectItem value="Bills">Bills</SelectItem>
                <SelectItem value="Dining">Dining</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="Salary">Salary</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
                <SelectItem value="Investment">Investment</SelectItem>
                <SelectItem value="Rental">Rental</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-[240px] justify-start text-left font-normal"
                onClick={(e) => e.preventDefault()}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
              {date && (
                <div className="p-3 border-t">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setDate(undefined)}
                  >
                    Clear date
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <TransactionList 
            transactions={filteredTransactions} 
            isLoading={isLoading} 
          />
        </TabsContent>
        <TabsContent value="income" className="mt-4">
          <TransactionList 
            transactions={filteredTransactions.filter(t => Number(t.amount) > 0)}
            isLoading={isLoading} 
          />
        </TabsContent>
        <TabsContent value="expenses" className="mt-4">
          <TransactionList 
            transactions={filteredTransactions.filter(t => Number(t.amount) < 0)}
            isLoading={isLoading} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface TransactionListProps {
  transactions: any[];
  isLoading: boolean;
}

function TransactionList({ transactions, isLoading }: TransactionListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-16 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">Loading transactions...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-16 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground mb-4">No transactions found</p>
        <div className="flex gap-2 justify-center">
          <Button asChild>
            <Link to="/app/add-income">Add Income</Link>
          </Button>
          <Button asChild>
            <Link to="/app/add-expense">Add Expense</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted/20 p-4 grid grid-cols-3 font-medium text-sm">
        <div>Transaction</div>
        <div>Date</div>
        <div className="text-right">Amount</div>
      </div>
      <div className="divide-y">
        {transactions.map(transaction => (
          <div key={transaction.id} className="p-4 grid grid-cols-3 hover:bg-muted/20">
            <div>
              <div className="font-medium">{transaction.title}</div>
              <Badge variant="outline" className="mt-1">{transaction.category}</Badge>
            </div>
            <div className="text-muted-foreground self-center">
              {transaction.date}
            </div>
            <div className="text-right self-center">
              <span className={Number(transaction.amount) > 0 ? 'income-amount' : 'expense-amount'}>
                {Number(transaction.amount) > 0 ? '+' : ''}₹{Math.abs(Number(transaction.amount)).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
