
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Sector,
  LabelList
} from 'recharts';
import { Card } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tag, Circle, Palette } from 'lucide-react';

export function ReportsPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  // Sample data for demonstration
  const monthlyData = [
    { name: 'Jan', income: 75000, expenses: 38500 },
    { name: 'Feb', income: 75000, expenses: 36800 },
    { name: 'Mar', income: 75000, expenses: 39500 },
    { name: 'Apr', income: 75000, expenses: 38700 }
  ];

  // Enhanced colors for the pie chart
  const categoryData = [
    { name: 'Housing', value: 15000, color: '#8B5CF6' },
    { name: 'Food', value: 8000, color: '#D946EF' },
    { name: 'Transportation', value: 5000, color: '#0EA5E9' },
    { name: 'Bills', value: 3000, color: '#F97316' },
    { name: 'Dining', value: 4000, color: '#33C3F0' },
    { name: 'Other', value: 3700, color: '#9b87f5' }
  ];

  const COLORS = categoryData.map(item => item.color);

  const handleGenerateReport = () => {
    // This would typically fetch data based on the date range
    console.log('Generating report for:', startDate, 'to', endDate);
  };

  // Custom active shape for the pie chart to enhance visual appeal
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
    return (
      <g>
        <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill="#333" fontSize={16} fontWeight={600}>
          {payload.name}
        </text>
        <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="#333" fontSize={14}>
          ₹{value.toLocaleString('en-IN')}
        </text>
        <text x={cx} y={cy + 30} dy={8} textAnchor="middle" fill="#666" fontSize={12}>
          {(percent * 100).toFixed(1)}%
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.8}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 12}
          outerRadius={outerRadius + 15}
          fill={fill}
        />
      </g>
    );
  };

  // Custom label renderer for better visibility
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Only show labels for slices that are big enough to be readable (more than 5%)
    if (percent < 0.05) return null;
    
    return (
      <g>
        <text 
          x={x} 
          y={y} 
          fill={COLORS[index % COLORS.length]}
          textAnchor={x > cx ? 'start' : 'end'} 
          dominantBaseline="central"
          fontSize={12}
          fontWeight="600"
        >
          {name}: ₹{value.toLocaleString('en-IN')}
        </text>
      </g>
    );
  };

  // Custom legend for better visualization
  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
        {payload.map((entry: any, index: number) => (
          <div 
            key={`item-${index}`} 
            className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
            onClick={() => setActiveIndex(activeIndex === index ? undefined : index)}
          >
            <Circle fill={entry.color} size={16} color={entry.color} />
            <span className="text-sm font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-custom-dark">Reports & Insights</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 border rounded-lg bg-custom-light">
          <h2 className="text-xl font-semibold mb-4 text-custom-dark">Monthly Overview</h2>
          <p className="text-muted-foreground mb-6">View your financial activities for the current month.</p>
          <Button style={{ backgroundColor: '#4527A0' }}>Generate Report</Button>
        </div>
        
        <div className="p-6 border rounded-lg bg-custom-light">
          <h2 className="text-xl font-semibold mb-4 text-custom-dark">Custom Date Range</h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <p className="text-sm mb-2">Start Date</p>
              <DatePicker 
                date={startDate} 
                onSelect={setStartDate} 
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm mb-2">End Date</p>
              <DatePicker 
                date={endDate} 
                onSelect={setEndDate} 
                className="w-full"
              />
            </div>
          </div>
          <Button 
            variant="outline" 
            style={{ borderColor: '#9575CD', color: '#4527A0' }}
            onClick={handleGenerateReport}
            disabled={!startDate || !endDate}
          >
            Select Dates
          </Button>
        </div>
      </div>
      
      <div className="p-6 border rounded-lg bg-custom-light">
        <h2 className="text-xl font-semibold mb-4 text-custom-dark">Income vs. Expenses</h2>
        <div className="h-64">
          <Tabs defaultValue="bar" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="line">Line Chart</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bar">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#4527A0" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="income" position="top" formatter={(value: number) => `₹${(value/1000).toFixed(0)}K`} />
                  </Bar>
                  <Bar dataKey="expenses" name="Expenses" fill="#9575CD" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="expenses" position="top" formatter={(value: number) => `₹${(value/1000).toFixed(0)}K`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="line">
              <div className="flex items-center justify-center h-full bg-muted/20 rounded-lg">
                <p className="text-muted-foreground">Line chart view coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="p-6 border rounded-lg bg-custom-light shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Palette size={20} className="text-custom-dark" />
          <h2 className="text-xl font-semibold text-custom-dark">Category Breakdown</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">View how your expenses are distributed across different categories</p>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={categoryData}
                cx="50%"
                cy="45%"
                labelLine={true}
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `₹${value.toLocaleString('en-IN')}`} 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #E5E7EB'
                }}
              />
              <Legend 
                content={<CustomLegend />}
                layout="horizontal"
                verticalAlign="bottom" 
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-slate-100">
          <h3 className="text-sm font-medium text-custom-dark flex items-center gap-2 mb-3">
            <Tag size={14} />
            Category Insights
          </h3>
          <p className="text-xs text-muted-foreground">
            Housing and Food represent the largest portions of your expenses. 
            Consider reviewing these categories for potential savings.
          </p>
        </div>
      </div>
    </div>
  );
}
