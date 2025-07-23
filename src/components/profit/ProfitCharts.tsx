import React from 'react';
import { GlassCard } from '@/components/glass/GlassCard';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const monthlyData = [
  { month: 'Jan', profit: 145000, revenue: 580000, margin: 25 },
  { month: 'Feb', profit: 156000, revenue: 624000, margin: 25 },
  { month: 'Mar', profit: 168000, revenue: 672000, margin: 25 },
  { month: 'Apr', profit: 172000, revenue: 688000, margin: 25 },
  { month: 'May', profit: 185000, revenue: 740000, margin: 25 },
  { month: 'Jun', profit: 198000, revenue: 792000, margin: 25 },
];

const categoryData = [
  { name: 'Electronics', profit: 450000, margin: 28.5, color: '#00bcd4' },
  { name: 'Home & Garden', profit: 285000, margin: 22.8, color: '#4caf50' },
  { name: 'Clothing', profit: 165000, margin: 35.2, color: '#ff9800' },
  { name: 'Sports & Outdoor', profit: 125000, margin: 18.4, color: '#e91e63' },
];

const supplierData = [
  { name: 'Al-Hidaa Supermarket', profit: 320000, products: 85 },
  { name: 'Al-Libya Mall', profit: 285000, products: 72 },
  { name: 'Al-Azzani Mall', profit: 180000, products: 45 },
  { name: 'Aden Port Hub', profit: 95000, products: 28 },
  { name: 'Independent Sellers', profit: 145000, products: 156 },
];

const projectionData = [
  { month: 'Jul', projected: 210000, historical: null },
  { month: 'Aug', projected: 225000, historical: null },
  { month: 'Sep', projected: 238000, historical: null },
  { month: 'Oct', projected: 245000, historical: null },
  { month: 'Nov', projected: 268000, historical: null },
  { month: 'Dec', projected: 295000, historical: null },
];

const combinedData = [...monthlyData.map(d => ({ ...d, projected: null })), ...projectionData];

export const ProfitTrendChart: React.FC = () => {
  return (
    <GlassCard variant="glow" className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Profit Trend Analysis</h3>
        <p className="text-sm text-muted-foreground">Monthly profit trends with 6-month projection</p>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            formatter={(value: number, name) => [
              `YER ${value.toLocaleString()}`,
              name === 'profit' ? 'Historical Profit' : name === 'projected' ? 'Projected Profit' : name
            ]}
          />
          <Line 
            type="monotone" 
            dataKey="profit" 
            stroke="hsl(var(--neon-blue))" 
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--neon-blue))', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="projected" 
            stroke="hsl(var(--neon-green))" 
            strokeWidth={2}
            strokeDasharray="8 8"
            dot={{ fill: 'hsl(var(--neon-green))', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
};

export const CategoryBreakdownChart: React.FC = () => {
  return (
    <GlassCard variant="glow" className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Profit by Category</h3>
        <p className="text-sm text-muted-foreground">Category-wise profit distribution and margins</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="profit"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`YER ${value.toLocaleString()}`, 'Profit']}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="space-y-4">
          {categoryData.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm font-medium text-foreground">{category.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">
                  YER {category.profit.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {category.margin.toFixed(1)}% margin
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

export const SupplierPerformanceChart: React.FC = () => {
  return (
    <GlassCard variant="glow" className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Supplier Performance</h3>
        <p className="text-sm text-muted-foreground">Profit contribution by supplier</p>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={supplierData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={10}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            formatter={(value: number, name) => [
              name === 'profit' ? `YER ${value.toLocaleString()}` : value,
              name === 'profit' ? 'Profit' : 'Products'
            ]}
          />
          <Bar 
            dataKey="profit" 
            fill="hsl(var(--neon-blue))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
};

export const ProfitProjectionChart: React.FC = () => {
  return (
    <GlassCard variant="glow" className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">6-Month Profit Projection</h3>
        <p className="text-sm text-muted-foreground">AI-powered profit forecasting with confidence intervals</p>
      </div>
      
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={projectionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--popover))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
            formatter={(value: number) => [`YER ${value.toLocaleString()}`, 'Projected Profit']}
          />
          <Area
            type="monotone"
            dataKey="projected"
            stroke="hsl(var(--neon-green))"
            fill="hsl(var(--neon-green) / 0.2)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  );
};