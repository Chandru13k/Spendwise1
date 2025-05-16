
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export function BudgetPlannerPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Budget Planner</h1>
          <p className="text-muted-foreground">Plan and track your monthly spending</p>
        </div>
        <Button>Set Budget Goal</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Housing</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">$800 / $1,000</span>
            <span className="text-sm text-muted-foreground">80%</span>
          </div>
          <Progress value={80} className="h-2" />
        </div>
        
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Food</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">$320 / $400</span>
            <span className="text-sm text-muted-foreground">80%</span>
          </div>
          <Progress value={80} className="h-2" />
        </div>
        
        <div className="p-6 border rounded-lg bg-card">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">Entertainment</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">$150 / $200</span>
            <span className="text-sm text-muted-foreground">75%</span>
          </div>
          <Progress value={75} className="h-2" />
        </div>
      </div>
      
      <div className="p-6 border rounded-lg bg-card">
        <h2 className="text-xl font-semibold mb-4">Budget vs Actual</h2>
        <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
          <p className="text-muted-foreground">Chart will appear here</p>
        </div>
      </div>
    </div>
  );
}
