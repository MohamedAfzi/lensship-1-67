import { Edit, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import { DiscoveredProduct, InventoryProduct, ProductType } from '@/types/product';

interface ProductCardProps {
  product: ProductType;
  viewMode: 'grid' | 'list';
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onPublish?: (id: string) => void;
  onCardClick?: (id: string) => void;
}

export const ProductCard = ({ product, viewMode, onEdit, onDelete, onPublish, onCardClick }: ProductCardProps) => {
  const isDiscovered = product.status === 'draft';
  const stockQuantity = 'stockQuantity' in product ? product.stockQuantity : undefined;

  const cardClassName = viewMode === 'grid' 
    ? 'group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-[1.02]'
    : 'group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300';

  const contentClassName = viewMode === 'grid' 
    ? 'p-4 space-y-3'
    : 'p-4 flex items-center gap-4';

  if (viewMode === 'list') {
    return (
      <Card className={cardClassName} onClick={() => onCardClick?.(product.id)}>
        <CardContent className={contentClassName}>
          <img 
            src={product.thumbnail} 
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg border border-border"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-foreground truncate">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.storeName}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-semibold text-primary">${product.price.toFixed(2)}</p>
                {stockQuantity !== undefined && (
                  <p className="text-xs text-muted-foreground">Stock: {stockQuantity}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <StatusBadge status={product.status} />
              
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEdit(product.id)}
                  className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                {isDiscovered && onPublish && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onPublish(product.id)}
                    className="h-8 w-8 p-0 hover:bg-neon-green/10 hover:text-neon-green"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(product.id)}
                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cardClassName} onClick={() => onCardClick?.(product.id)}>
      <CardContent className={contentClassName}>
        <div className="relative">
          <img 
            src={product.thumbnail} 
            alt={product.name}
            className="w-full aspect-square object-cover rounded-lg border border-border"
          />
          <div className="absolute top-2 right-2">
            <StatusBadge status={product.status} />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-foreground line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.storeName}</p>
          
          <div className="flex items-center justify-between">
            <p className="font-semibold text-primary">${product.price.toFixed(2)}</p>
            {stockQuantity !== undefined && (
              <p className="text-xs text-muted-foreground">Stock: {stockQuantity}</p>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(product.id)}
            className="flex-1 h-8 text-xs hover:bg-primary/10 hover:text-primary hover:border-primary"
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          
          {isDiscovered && onPublish && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onPublish(product.id)}
              className="flex-1 h-8 text-xs hover:bg-neon-green/10 hover:text-neon-green hover:border-neon-green"
            >
              <Upload className="h-3 w-3 mr-1" />
              Publish
            </Button>
          )}
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => onDelete(product.id)}
            className="flex-1 h-8 text-xs hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};