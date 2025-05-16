
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from 'recharts';
import { tooltipFormatter } from '../utils/expenseChartUtils';

interface ExpensePieChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  isLoading: boolean;
  hideLabels?: boolean;
}

export function ExpensePieChart({ data, isLoading, hideLabels = false }: ExpensePieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p>Loading expense data...</p>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(undefined)}
            label={hideLabels ? undefined : ({
              name,
              percent
            }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
            labelLine={!hideLabels}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={tooltipFormatter} />
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
