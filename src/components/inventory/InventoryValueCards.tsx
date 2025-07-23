import { DollarSign, Package, TrendingUp, AlertTriangle } from 'lucide-react';
import { GlassCard } from '@/components/glass/GlassCard';
import { InventoryMetrics } from '@/hooks/useInventoryCalculations';

interface InventoryValueCardsProps {
  metrics: InventoryMetrics;
}

export const InventoryValueCards = ({ metrics }: InventoryValueCardsProps) => {
  const formatCurrency = (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <GlassCard variant="glow" hover="scale" className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Inventory Value</p>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(metrics.totalValue)}</p>
          </div>
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
        </div>
      </GlassCard>

      <GlassCard variant="default" hover="scale" className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Items</p>
            <p className="text-2xl font-bold text-foreground">{metrics.totalItems.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center">
            <Package className="h-6 w-6 text-neon-green" />
          </div>
        </div>
      </GlassCard>

      <GlassCard variant="default" hover="scale" className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Avg Item Value</p>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(metrics.averageItemValue)}</p>
          </div>
          <div className="w-12 h-12 bg-neon-blue/20 rounded-full flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-neon-blue" />
          </div>
        </div>
      </GlassCard>

      <GlassCard variant="default" hover="scale" className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Stock Turnover</p>
            <p className="text-2xl font-bold text-foreground">{(metrics.stockTurnoverRate * 100).toFixed(1)}%</p>
          </div>
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-accent" />
          </div>
        </div>
      </GlassCard>
    </div>
  );
};