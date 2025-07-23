import { Package, TrendingUp } from 'lucide-react';
import { GlassCard } from '@/components/glass/GlassCard';
import { Badge } from '@/components/ui/badge';
import { InventoryProduct } from '@/types/product';

interface TopValueProductsProps {
  products: InventoryProduct[];
}

export const TopValueProducts = ({ products }: TopValueProductsProps) => {
  const formatCurrency = (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <GlassCard variant="default" className="p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Top Value Products</h3>
          <p className="text-sm text-muted-foreground">Highest value inventory items</p>
        </div>
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => {
          const totalValue = product.price * product.stockQuantity;
          return (
            <div key={product.id} className="flex items-center gap-4 p-4 rounded-lg bg-muted/10 hover:bg-muted/20 transition-colors">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground truncate">{product.name}</h4>
                  <Badge variant={product.status === 'published' ? 'default' : 'secondary'}>
                    {product.status === 'published' ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {product.storeName} • {product.category}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-foreground">
                  {formatCurrency(totalValue)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(product.price)} × {product.stockQuantity}
                </p>
              </div>

              <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-accent">#{index + 1}</span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};