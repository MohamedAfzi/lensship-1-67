import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/glass';
import { Badge } from '@/components/ui/badge';
import StarRating from './StarRating';
import { Supplier } from '@/types/flowship';
import { Building2, Store, ShoppingCart, Verified } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SupplierInfoProps {
  supplier: Supplier;
  className?: string;
}

const SupplierInfo: React.FC<SupplierInfoProps> = ({ supplier, className }) => {
  const navigate = useNavigate();

  const handleSupplierClick = () => {
    navigate(`/products/${supplier.id}`);
  };

  const getEntityIcon = () => {
    switch (supplier.entityType) {
      case 'supermarket':
        return ShoppingCart;
      case 'commercialMall':
      case 'shoppingCenter':
        return Building2;
      default:
        return Store;
    }
  };

  const getEntityLabel = () => {
    switch (supplier.entityType) {
      case 'supermarket':
        return 'Supermarket';
      case 'commercialMall':
        return 'Commercial Mall';
      case 'shoppingCenter':
        return 'Shopping Center';
      case 'retailSeller':
        return 'Retail Seller';
      default:
        return 'Store';
    }
  };

  const EntityIcon = getEntityIcon();

  return (
    <GlassCard 
      className={cn("p-6 cursor-pointer hover:bg-card/50 transition-all duration-300", className)}
      onClick={handleSupplierClick}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground hover:text-neon-blue transition-colors">
                {supplier.name}
              </h3>
              {supplier.verified && (
                <Verified className="h-5 w-5 text-neon-blue" />
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <EntityIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {getEntityLabel()}
              </span>
              <Badge variant="outline" className="text-xs">
                {supplier.type === 'hub' ? 'Supplier Hub' : 'Independent'}
              </Badge>
            </div>
          </div>
          
          <StarRating 
            rating={supplier.rating} 
            size="sm"
            showCount={false}
          />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {supplier.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{supplier.totalProducts.toLocaleString()} products</span>
          <span>Joined {new Date(supplier.joinedDate).toLocaleDateString()}</span>
        </div>

        {supplier.shippingZones && supplier.shippingZones.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {supplier.shippingZones.slice(0, 3).map((zone) => (
              <Badge key={zone} variant="secondary" className="text-xs capitalize">
                {zone}
              </Badge>
            ))}
            {supplier.shippingZones.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{supplier.shippingZones.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default SupplierInfo;