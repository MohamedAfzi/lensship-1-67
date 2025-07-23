import { useState } from 'react';
import { Check, Package, Star, ShoppingCart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { FlowShipProduct } from '@/types/flowship';

interface ProductGridProps {
  products: FlowShipProduct[];
  selectedProducts: string[];
  onProductSelect: (productId: string) => void;
  onProductImport: (productId: string) => void;
  className?: string;
}

const ProductGrid = ({ 
  products, 
  selectedProducts, 
  onProductSelect, 
  onProductImport,
  className 
}: ProductGridProps) => {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} YER`;
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {products.map((product) => {
        const isSelected = selectedProducts.includes(product.id);
        
        return (
          <Card
            key={product.id}
            className={cn(
              "bg-mobile-surface border-mobile-border transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/10",
              isSelected && "ring-2 ring-neon-blue border-neon-blue/50"
            )}
          >
            <div className="p-4 space-y-3">
              {/* Selection Checkbox */}
              <div className="flex items-center justify-between">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => onProductSelect(product.id)}
                  className="data-[state=checked]:bg-neon-blue data-[state=checked]:border-neon-blue"
                />
                <Badge
                  variant={product.inStock ? "secondary" : "destructive"}
                  className={cn(
                    "text-xs",
                    product.inStock 
                      ? "bg-neon-green/10 text-neon-green" 
                      : "bg-destructive/10"
                  )}
                >
                  {product.inStock ? `${product.stockQuantity} in stock` : 'Out of stock'}
                </Badge>
              </div>

              {/* Product Image */}
              <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
                
                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-neon-blue">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Category */}
                <Badge variant="outline" className="text-xs border-mobile-border">
                  {product.category}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-mobile-border hover:bg-accent"
                  onClick={() => onProductSelect(product.id)}
                >
                  {isSelected ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Selected
                    </>
                  ) : (
                    'Select'
                  )}
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-neon-blue hover:bg-neon-blue/90 text-background"
                  onClick={() => onProductImport(product.id)}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Import
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductGrid;