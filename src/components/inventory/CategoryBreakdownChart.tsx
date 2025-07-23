import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { GlassCard } from '@/components/glass/GlassCard';
import { InventoryMetrics } from '@/hooks/useInventoryCalculations';

interface CategoryBreakdownChartProps {
  metrics: InventoryMetrics;
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--neon-blue))',
  'hsl(var(--neon-green))',
  'hsl(var(--accent))',
  'hsl(var(--secondary))',
];

export const CategoryBreakdownChart = ({ metrics }: CategoryBreakdownChartProps) => {
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  const renderTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {
      const data = props.payload[0].payload;
      return (
        <div className="bg-card/90 backdrop-blur-md border border-border/20 rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data.category}</p>
          <p className="text-sm text-muted-foreground">
            Value: {formatCurrency(data.value)} ({data.percentage.toFixed(1)}%)
          </p>
          <p className="text-sm text-muted-foreground">Items: {data.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <GlassCard variant="default" className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2">Value by Category</h3>
          <p className="text-sm text-muted-foreground">Inventory value distribution</p>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={metrics.categoryBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                nameKey="category"
              >
                {metrics.categoryBreakdown.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={renderTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard variant="default" className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-foreground mb-2">Category Breakdown</h3>
          <p className="text-sm text-muted-foreground">Detailed category statistics</p>
        </div>
        
        <div className="space-y-4">
          {metrics.categoryBreakdown.map((category, index) => (
            <div key={category.category} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm font-medium text-foreground">
                  {category.category}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">
                  {formatCurrency(category.value)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {category.percentage.toFixed(1)}% • {category.count} items
                </p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};