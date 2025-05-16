
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExpensePieChart } from './charts/ExpensePieChart';
import { useExpenseData } from './hooks/useExpenseData';

export function ExpenseOverview() {
  const { chartData, isLoading } = useExpenseData();
  
  return (
    <Card className="col-span-1 lg:col-span-2" style={{ backgroundColor: '#EDE7F6' }}>
      <CardHeader>
        <CardTitle className="text-custom-dark">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <ExpensePieChart data={chartData} isLoading={isLoading} hideLabels={true} />
      </CardContent>
    </Card>
  );
}
