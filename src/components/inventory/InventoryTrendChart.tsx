import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { GlassCard } from '@/components/glass/GlassCard';
import { InventoryTrendData } from '@/hooks/useInventoryCalculations';

interface InventoryTrendChartProps {
  data: InventoryTrendData[];
}

export const InventoryTrendChart = ({ data }: InventoryTrendChartProps) => {
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <GlassCard variant="default" className="p-6 mb-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Inventory Value Trend</h3>
        <p className="text-sm text-muted-foreground">30-day inventory value history</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              className="text-xs text-muted-foreground"
            />
            <YAxis 
              tickFormatter={formatCurrency}
              className="text-xs text-muted-foreground"
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), '']}
              labelFormatter={(label) => formatDate(label)}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                backdropFilter: 'blur(8px)',
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              name="Total Value"
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="published" 
              stroke="hsl(var(--neon-green))" 
              strokeWidth={2}
              name="Published"
              dot={{ fill: 'hsl(var(--neon-green))', strokeWidth: 2, r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="outOfStock" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              name="Out of Stock"
              dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};