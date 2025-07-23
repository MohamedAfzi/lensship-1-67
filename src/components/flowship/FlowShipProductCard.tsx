import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, ShoppingCart, Edit3, Package } from 'lucide-react';
import { FlowShipProduct } from '@/types/flowship';
import { useToast } from '@/hooks/use-toast';

interface FlowShipProductCardProps {
  product: FlowShipProduct;
  isSelected?: boolean;
  onSelect?: (productId: string) => void;
  onImport?: (productId: string) => void;
  onEdit?: (productId: string) => void;
  showCheckbox?: boolean;
  className?: string;
}

const FlowShipProductCard = ({ 
  product, 
  isSelected = false, 
  onSelect, 
  onImport,
  onEdit,
  showCheckbox = false,
  className = ""
}: FlowShipProductCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-YE', {
      style: 'currency',
      currency: 'YER',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleProductClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons or checkbox
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('[role="checkbox"]')) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  const handleImportProduct = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsImporting(true);
    
    // Simulate import delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsImporting(false);
    if (onImport) {
      onImport(product.id);
    } else {
      toast({
        title: "Product Imported",
        description: `${product.name} has been added to your inventory.`,
      });
    }
  };

  const handleEditProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(product.id);
    } else {
      navigate(`/edit-listing/${product.id}`);
    }
  };

  const handleCheckboxChange = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(product.id);
    }
  };

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl bg-mobile-surface border-mobile-border overflow-hidden ${className}`}
      onClick={handleProductClick}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-mobile-surface/50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Selection Checkbox */}
          {showCheckbox && (
            <div className="absolute top-3 left-3 z-10" onClick={handleCheckboxChange}>
              <Checkbox
                checked={isSelected}
                className="bg-background/80 border-2"
              />
            </div>
          )}

          {/* Stock Badge */}
          <div className="absolute top-3 right-3">
            <Badge 
              variant={product.inStock ? "secondary" : "destructive"}
              className="text-xs"
            >
              {product.inStock ? `${product.stockQuantity} in stock` : 'Out of stock'}
            </Badge>
          </div>

          {/* Price Badge */}
          {product.originalPrice && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="destructive" className="text-xs">
                Sale
              </Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground line-clamp-2 flex-1">
              {product.name}
            </h3>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Category */}
          <Badge variant="outline" className="text-xs mb-3">
            {product.category}
          </Badge>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-neon-blue">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">4.{Math.floor(Math.random() * 5) + 5}</span>
            <span className="text-xs text-muted-foreground">
              ({Math.floor(Math.random() * 100) + 20} reviews)
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleImportProduct}
              disabled={!product.inStock || isImporting}
              className="flex-1 h-9 bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:from-neon-blue/80 hover:to-neon-purple/80 transition-all duration-300"
            >
              {isImporting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Import
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleEditProduct}
              className="h-9 px-3 border-mobile-border hover:bg-mobile-surface/80"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlowShipProductCard;