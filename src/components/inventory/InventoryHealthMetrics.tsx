import { AlertTriangle, Package, TrendingDown } from 'lucide-react';
import { GlassCard } from '@/components/glass/GlassCard';
import { Badge } from '@/components/ui/badge';
import { InventoryProduct } from '@/types/product';

interface InventoryHealthMetricsProps {
  lowStockProducts: InventoryProduct[];
  stockTurnoverRate: number;
}

export const InventoryHealthMetrics = ({ lowStockProducts, stockTurnoverRate }: InventoryHealthMetricsProps) => {
  const formatCurrency = (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const getTurnoverColor = (rate: number) => {
    if (rate >= 0.8) return 'text-neon-green';
    if (rate >= 0.6) return 'text-accent';
    return 'text-destructive';
  };

  const getTurnoverStatus = (rate: number) => {
    if (rate >= 0.8) return 'Excellent';
    if (rate >= 0.6) return 'Good';
    return 'Needs Attention';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <GlassCard variant="default" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Stock Health</h3>
            <p className="text-sm text-muted-foreground">Inventory turnover analysis</p>
          </div>
          <div className="w-12 h-12 bg-neon-blue/20 rounded-full flex items-center justify-center">
            <TrendingDown className="h-6 w-6 text-neon-blue" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/10">
            <div>
              <p className="font-medium text-foreground">Stock Turnover Rate</p>
              <p className="text-sm text-muted-foreground">Annual inventory turnover</p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${getTurnoverColor(stockTurnoverRate)}`}>
                {(stockTurnoverRate * 100).toFixed(1)}%
              </p>
              <Badge variant="outline" className="text-xs">
                {getTurnoverStatus(stockTurnoverRate)}
              </Badge>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/10">
            <div>
              <p className="font-medium text-foreground">Days on Hand</p>
              <p className="text-sm text-muted-foreground">Average inventory duration</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">
                {Math.round(365 / (stockTurnoverRate * 365 / 100))}
              </p>
              <p className="text-sm text-muted-foreground">days</p>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard variant="default" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Low Stock Alert</h3>
            <p className="text-sm text-muted-foreground">Products requiring attention</p>
          </div>
          <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
        </div>

        {lowStockProducts.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">All products are well stocked</p>
          </div>
        ) : (
          <div className="space-y-3">
            {lowStockProducts.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.storeName}</p>
                </div>
                <div className="text-right">
                  <Badge variant="destructive" className="mb-1">
                    {product.stockQuantity} left
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </div>
            ))}
            {lowStockProducts.length > 5 && (
              <p className="text-center text-sm text-muted-foreground pt-2">
                +{lowStockProducts.length - 5} more products need restocking
              </p>
            )}
          </div>
        )}
      </GlassCard>
    </div>
  );
};