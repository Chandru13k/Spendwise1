
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { processTransactionData } from '../utils/expenseChartUtils';

export function useExpenseData() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  const fetchData = async () => {
    if (!user) return;
    
    try {
      // Get current date for filtering
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // 0-indexed to 1-indexed
      const currentYear = currentDate.getFullYear();
      
      // Format as YYYY-MM for SQL comparison
      const monthStart = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
      const nextMonth = currentMonth === 12 ? `${currentYear + 1}-01-01` : `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;
      
      // Fetch transaction data for current month
      const { data, error } = await supabase
        .from('transactions')
        .select('category, amount')
        .eq('user_id', user.id)
        .lt('amount', 0) // Only expenses
        .gte('date', monthStart)
        .lt('date', nextMonth);
      
      if (error) throw error;
      
      setChartData(processTransactionData(data));
    } catch (error) {
      console.error('Error fetching expense data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up a Supabase subscription for real-time updates
    const transactionChannel = supabase
      .channel('expense-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions',
          filter: `user_id=eq.${user?.id}`
        },
        () => {
          console.log('Transaction changed, refetching expense data');
          fetchData(); // Immediately refetch when transactions change
        }
      )
      .subscribe();
    
    // Add a polling mechanism as a fallback to ensure data freshness
    const pollingInterval = setInterval(() => {
      fetchData();
    }, 10000); // Poll every 10 seconds
    
    return () => {
      // Clean up subscription and interval when component unmounts
      supabase.removeChannel(transactionChannel);
      clearInterval(pollingInterval);
    };
  }, [user]);

  return { chartData, isLoading };
}
