
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownLeft, ArrowUpRight, Coffee, Home, ShoppingCart, Utensils, Wallet, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

// Map categories to icons
const categoryIcons = {
  'Housing': Home,
  'Food': ShoppingCart,
  'Dining': Utensils,
  'Income': ArrowUpRight,
  'Bills': Zap,
  'Entertainment': Coffee
};

// Default icon for categories not in the map
const DefaultIcon = Wallet;

export function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false })
          .limit(5);
        
        if (error) throw error;
        
        setTransactions(data || []);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTransactions();
  }, [user]);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link to="/app/transactions">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            <div className="py-4 text-center">Loading transactions...</div>
          ) : transactions.length > 0 ? (
            transactions.map(transaction => {
              // Determine the icon to use
              const IconComponent = transaction.category && categoryIcons[transaction.category] 
                ? categoryIcons[transaction.category] 
                : DefaultIcon;
              
              return (
                <div key={transaction.id} className="transaction-item">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-muted mr-3">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.title}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className={Number(transaction.amount) > 0 ? 'income-amount' : 'expense-amount'}>
                      {Number(transaction.amount) > 0 ? '+' : ''}
                      ₹{Math.abs(Number(transaction.amount)).toLocaleString('en-IN')}
                    </span>
                    <Badge variant="outline" className="ml-2">{transaction.category}</Badge>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No recent transactions</p>
              <div className="flex gap-2 justify-center">
                <Button asChild size="sm">
                  <Link to="/app/add-income">Add Income</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/app/add-expense">Add Expense</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
