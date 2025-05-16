
// Define standard category colors with our color scheme
export const CATEGORY_COLORS = {
  'Housing': '#4527A0',
  'Food': '#9575CD',
  'Transportation': '#673AB7', 
  'Entertainment': '#7E57C2',
  'Bills': '#5E35B1',
  'Dining': '#B39DDB',
  'Other': '#D1C4E9'
};

export const getDefaultChartData = () => [
  { name: 'Housing', value: 15000, color: CATEGORY_COLORS.Housing },
  { name: 'Food', value: 8000, color: CATEGORY_COLORS.Food },
  { name: 'Transportation', value: 5000, color: CATEGORY_COLORS.Transportation },
  { name: 'Bills', value: 3000, color: CATEGORY_COLORS.Bills },
  { name: 'Dining', value: 4000, color: CATEGORY_COLORS.Dining }
];

export const processTransactionData = (data: any[] | null) => {
  if (!data || data.length === 0) {
    return getDefaultChartData();
  }

  const categoryMap = new Map();
  
  data.forEach(transaction => {
    const category = transaction.category || 'Other';
    const amount = Math.abs(Number(transaction.amount));
    
    const currentAmount = categoryMap.get(category) || 0;
    categoryMap.set(category, currentAmount + amount);
  });
  
  // Convert to chart format
  return Array.from(categoryMap.entries()).map(([name, value]) => ({
    name,
    value,
    color: CATEGORY_COLORS[name as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.Other
  }));
};

// Custom formatter for the tooltip
export const tooltipFormatter = (value: number) => {
  return [`₹${value.toLocaleString('en-IN')}`, 'Amount'];
};
