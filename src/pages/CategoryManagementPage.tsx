
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash } from 'lucide-react';

export function CategoryManagementPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-muted-foreground">Manage your income and expense categories</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Income Categories</h2>
          
          <div className="space-y-2">
            <CategoryItem name="Salary" color="#22c55e" />
            <CategoryItem name="Freelance" color="#3b82f6" />
            <CategoryItem name="Investments" color="#8b5cf6" />
            <CategoryItem name="Other" color="#94a3b8" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Expense Categories</h2>
          
          <div className="space-y-2">
            <CategoryItem name="Housing" color="#ef4444" />
            <CategoryItem name="Food" color="#f97316" />
            <CategoryItem name="Transportation" color="#eab308" />
            <CategoryItem name="Entertainment" color="#06b6d4" />
            <CategoryItem name="Utilities" color="#6366f1" />
            <CategoryItem name="Healthcare" color="#ec4899" />
            <CategoryItem name="Other" color="#94a3b8" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryItem({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md">
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
        <span>{name}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
