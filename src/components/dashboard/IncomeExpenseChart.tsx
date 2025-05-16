
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

export function IncomeExpenseChart() {
  const [actualData, setActualData] = useState<any[]>([]);
  const [predictedData, setPredictedData] = useState<any[]>([]);
  const [currentMonthData, setCurrentMonthData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [monthlySalary, setMonthlySalary] = useState(0);
  const { user } = useAuth();
  
  const fetchData = async () => {
    if (!user) return;
    
    try {
      // Get current month for prediction purposes
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // 0-indexed to 1-indexed
      const currentYear = currentDate.getFullYear();
      
      // Fetch user's monthly salary from user_metadata if available
      const { data: userData } = await supabase.auth.getUser();
      const userMetadata = userData?.user?.user_metadata || {};
      
      if (userMetadata.monthly_salary) {
        setMonthlySalary(Number(userMetadata.monthly_salary));
      }
      
      // Fetch transaction data
      const { data, error } = await supabase
        .from('transactions')
        .select('type, amount, date')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      // Process data by month
      const monthlyData = new Map();
      const predictedMonthlyData = new Map();
      
      // Set default months
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      // Initialize data structures
      months.forEach((month, idx) => {
        // Past months (Jan-Apr) for actual data
        if (idx < 4) {
          monthlyData.set(month, { 
            name: month, 
            income: 0, 
            expenses: 0,
            savings: 0
          });
        }
        
        // Current month data
        if (idx === currentDate.getMonth()) {
          setCurrentMonthData({
            name: month,
            income: 0,
            expenses: 0,
            savings: 0
          });
        }
        
        // Future months (May-Dec) for prediction
        if (idx >= 4) {
          predictedMonthlyData.set(month, { 
            name: month, 
            income: 0, 
            expenses: 0,
            savings: 0
          });
        }
      });
      
      // Aggregate actual data
      if (data) {
        data.forEach(transaction => {
          if (!transaction.date) return;
          
          const date = new Date(transaction.date);
          const month = months[date.getMonth()];
          const monthIdx = date.getMonth();
          
          // Skip if not within current year
          if (date.getFullYear() !== currentYear) return;
          
          // Handle data based on month
          if (monthIdx < 4) {
            // Jan-Apr: Historical data
            const monthData = monthlyData.get(month) || { name: month, income: 0, expenses: 0, savings: 0 };
            
            if (transaction.type === 'income' || transaction.amount > 0) {
              monthData.income += Math.abs(Number(transaction.amount));
            } else {
              monthData.expenses += Math.abs(Number(transaction.amount));
            }
            
            // Calculate savings
            monthData.savings = monthData.income - monthData.expenses;
            
            monthlyData.set(month, monthData);
          } else if (monthIdx === currentDate.getMonth()) {
            // Current month: Track separately
            let updatedCurrentMonth = { 
              name: month, 
              income: 0, 
              expenses: 0,
              savings: 0
            };
            
            // Gather all transactions for current month
            data.forEach(t => {
              if (!t.date) return;
              const tDate = new Date(t.date);
              if (tDate.getMonth() === currentDate.getMonth() && tDate.getFullYear() === currentDate.getFullYear()) {
                if (t.type === 'income' || t.amount > 0) {
                  updatedCurrentMonth.income += Math.abs(Number(t.amount));
                } else {
                  updatedCurrentMonth.expenses += Math.abs(Number(t.amount));
                }
              }
            });
            
            // Calculate savings
            updatedCurrentMonth.savings = updatedCurrentMonth.income - updatedCurrentMonth.expenses;
            
            setCurrentMonthData(updatedCurrentMonth);
          }
        });
      }
      
      // Calculate average from existing data for prediction
      let totalIncome = 0;
      let totalExpenses = 0;
      let count = 0;
      
      // Calculate average from Jan-Apr data
      for (let i = 0; i < 4; i++) {
        const monthData = monthlyData.get(months[i]);
        if (monthData.income > 0 || monthData.expenses > 0) {
          totalIncome += monthData.income;
          totalExpenses += monthData.expenses;
          count++;
        }
      }
      
      // If monthly salary is set, use it for prediction
      const avgIncome = monthlySalary > 0 ? 
        monthlySalary : 
        (count > 0 ? totalIncome / count : 0);
        
      const avgExpenses = count > 0 ? totalExpenses / count : 0;
      
      // Generate prediction for May-Dec
      for (let i = 4; i < months.length; i++) {
        const monthData = predictedMonthlyData.get(months[i]) || { name: months[i], income: 0, expenses: 0, savings: 0 };
        
        // Apply growth trend
        monthData.income = Math.round(avgIncome * (1 + 0.03 * (i - 3)));
        monthData.expenses = Math.round(avgExpenses * (1 + 0.02 * (i - 3)));
        
        // Calculate savings
        monthData.savings = monthData.income - monthData.expenses;
        
        predictedMonthlyData.set(months[i], monthData);
      }
      
      // Convert to arrays for charts
      const actualDataArray = Array.from(monthlyData.values());
      const predictedDataArray = Array.from(predictedMonthlyData.values());
      
      setActualData(actualDataArray);
      setPredictedData(predictedDataArray);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
    
    // Set up a Supabase subscription to listen for changes to the transactions table
    const transactionChannel = supabase
      .channel('db-transactions-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions',
          filter: `user_id=eq.${user?.id}`
        },
        () => {
          console.log('Transaction changed, refetching data');
          fetchData(); // Immediately refetch when transactions change
        }
      )
      .subscribe();
      
    // Also listen for profile changes (for salary updates)
    const profileChannel = supabase
      .channel('db-profile-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user?.id}`
        },
        () => {
          console.log('Profile changed, refetching data');
          fetchData(); // Immediately refetch when profile changes
        }
      )
      .subscribe();
      
    // Set up polling as a fallback to ensure data is always fresh
    const pollingInterval = setInterval(() => {
      fetchData();
    }, 10000); // Poll every 10 seconds
      
    return () => {
      // Clean up subscriptions and intervals when component unmounts
      supabase.removeChannel(transactionChannel);
      supabase.removeChannel(profileChannel);
      clearInterval(pollingInterval);
    };
  }, [user]);
  
  // Check if any predicted month shows expenses > income
  const hasBudgetWarning = predictedData.some(month => month.expenses > month.income);
  
  // Custom tooltip that shows prediction label
  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="text-sm font-semibold mb-1">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} className="text-xs">
              {`${entry.name}: ₹${entry.value.toLocaleString('en-IN')}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="col-span-1 lg:col-span-2" style={{ backgroundColor: '#EDE7F6' }}>
      <CardHeader>
        <CardTitle className="text-custom-dark">Income vs. Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        {hasBudgetWarning && (
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Warning: Predicted expenses exceed income in future months
            </AlertDescription>
          </Alert>
        )}
        
        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <p>Loading chart data...</p>
          </div>
        ) : (
          <Tabs defaultValue="historical" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="historical">Jan-Apr Data</TabsTrigger>
              <TabsTrigger value="current">Current Month</TabsTrigger>
              <TabsTrigger value="predicted">Predicted Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="historical">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={actualData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="income" name="Income" fill="#4527A0" />
                    <Bar dataKey="expenses" name="Expenses" fill="#9575CD" />
                    <Bar dataKey="savings" name="Savings" fill="#6E59A5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="current">
              <div className="h-80">
                {currentMonthData ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[currentMonthData]}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="income" name="Income" fill="#4527A0" />
                      <Bar dataKey="expenses" name="Expenses" fill="#9575CD" />
                      <Bar dataKey="savings" name="Savings" fill="#6E59A5" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No data for current month</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="predicted">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={predictedData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="income" name="Predicted Income" fill="#4527A0" />
                    <Bar dataKey="expenses" name="Predicted Expenses" fill="#9575CD" />
                    <Bar dataKey="savings" name="Predicted Savings" fill="#6E59A5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
}
