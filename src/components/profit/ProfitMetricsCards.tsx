import React from 'react';
import { GlassCard } from '@/components/glass/GlassCard';
import { TrendingUp, TrendingDown, DollarSign, Target, BarChart3, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
  description?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, trend, description }) => {
  const trendColor = trend === 'up' ? 'text-neon-green' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground';
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : BarChart3;

  return (
    <GlassCard variant="glow" className="p-6 hover:scale-105 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl font-bold text-foreground">{value}</h3>
            <div className={cn("flex items-center space-x-1", trendColor)}>
              <TrendIcon className="h-4 w-4" />
              <span className="text-sm font-medium">{Math.abs(change)}%</span>
            </div>
          </div>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </GlassCard>
  );
};

interface ProfitMetricsCardsProps {
  totalProfit: number;
  profitMargin: number;
  monthlyGrowth: number;
  roi: number;
  totalRevenue: number;
  riskyProducts: number;
}

export const ProfitMetricsCards: React.FC<ProfitMetricsCardsProps> = ({
  totalProfit,
  profitMargin,
  monthlyGrowth,
  roi,
  totalRevenue,
  riskyProducts
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MetricCard
        title="Total Profit"
        value={`YER ${totalProfit.toLocaleString()}`}
        change={monthlyGrowth}
        trend={monthlyGrowth > 0 ? 'up' : monthlyGrowth < 0 ? 'down' : 'neutral'}
        icon={<DollarSign className="h-6 w-6" />}
        description="Total profit from all products"
      />
      
      <MetricCard
        title="Profit Margin"
        value={`${profitMargin.toFixed(1)}%`}
        change={5.2}
        trend="up"
        icon={<BarChart3 className="h-6 w-6" />}
        description="Average profit margin across products"
      />
      
      <MetricCard
        title="Monthly Growth"
        value={`${monthlyGrowth > 0 ? '+' : ''}${monthlyGrowth.toFixed(1)}%`}
        change={Math.abs(monthlyGrowth)}
        trend={monthlyGrowth > 0 ? 'up' : 'down'}
        icon={<TrendingUp className="h-6 w-6" />}
        description="Profit growth compared to last month"
      />
      
      <MetricCard
        title="ROI"
        value={`${roi.toFixed(1)}%`}
        change={8.3}
        trend="up"
        icon={<Target className="h-6 w-6" />}
        description="Return on investment"
      />
      
      <MetricCard
        title="Total Revenue"
        value={`YER ${totalRevenue.toLocaleString()}`}
        change={12.5}
        trend="up"
        icon={<DollarSign className="h-6 w-6" />}
        description="Total revenue from all sales"
      />
      
      <MetricCard
        title="Risk Products"
        value={riskyProducts.toString()}
        change={0}
        trend="neutral"
        icon={<AlertTriangle className="h-6 w-6" />}
        description="Products with low profit margins"
      />
    </div>
  );
};