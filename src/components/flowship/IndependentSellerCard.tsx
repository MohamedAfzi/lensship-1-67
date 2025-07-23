import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Package, ShieldCheck, ExternalLink } from 'lucide-react';
import { IndependentSeller } from '@/types/flowship';
import { getEntityTypeStyles } from '@/lib/entity-styles';

interface IndependentSellerCardProps {
  seller: IndependentSeller;
  onViewSeller: (id: string) => void;
  onViewProducts: (id: string) => void;
}

const IndependentSellerCard = ({ seller, onViewSeller, onViewProducts }: IndependentSellerCardProps) => {
  const formatProductCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}k+`;
    }
    return count.toString();
  };

  const styles = getEntityTypeStyles(seller);
  const EntityIcon = styles.config.icon;

  return (
    <Card className={`group ${styles.cardHover} transition-all duration-300 hover:scale-[1.02] bg-mobile-surface border-mobile-border overflow-hidden`}>
      <CardContent className="p-0">
        {/* Header with circular avatar */}
        <div className="relative p-4 pb-2">
          <div className="flex items-center gap-4">
            {/* Circular Avatar */}
            <div className="relative">
              <div className={`w-18 h-18 rounded-full ${styles.bgGradient} ${styles.borderTheme} flex items-center justify-center overflow-hidden shadow-lg`}>
                {seller.logo ? (
                  <img 
                    src={seller.logo} 
                    alt={seller.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <EntityIcon className={`h-8 w-8 ${styles.primaryColor}`} />
                )}
              </div>
              {/* Trust Badge Overlay */}
              {seller.verified && (
                <div className="absolute -top-1 -right-1 z-10">
                  <div className={`w-6 h-6 rounded-full bg-${styles.config.color} border-2 border-background flex items-center justify-center shadow-lg animate-pulse`}>
                    <ShieldCheck className="h-3 w-3 text-background" />
                  </div>
                </div>
              )}
            </div>

            {/* Seller Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-base text-foreground leading-tight">
                  {seller.name}
                </h3>
                {seller.verified && (
                  <Badge variant="secondary" className={`${styles.verifiedBg} ${styles.verifiedText} text-xs ${styles.verifiedBorder}`}>
                    Verified
                  </Badge>
                )}
                <Badge variant="outline" className={`text-xs ${styles.outlineBorder} ${styles.outlineText}`}>
                  {styles.config.label}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm">{seller.rating}</span>
                </div>
                <span className="text-muted-foreground text-xs">•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground capitalize">{seller.region} – Downtown</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-4 py-3 bg-mobile-surface/50">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-muted-foreground">Categories</div>
              <div className={`font-bold text-sm ${styles.statColor}`}>16</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Products</div>
              <div className={`font-bold text-sm ${styles.statColor}`}>{formatProductCount(seller.totalProducts)} SKUs</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Shipping</div>
              <div className={`font-bold text-sm ${styles.statColor}`}>{seller.shippingZones.length} Zones</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 py-2">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {seller.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="p-4 pt-2 flex gap-2">
          <Button
            onClick={() => onViewProducts(seller.id)}
            className={`flex-1 h-9 ${styles.buttonGradient} ${styles.buttonHover} shadow-lg ${styles.cardHover} transition-all duration-300`}
          >
            View Products
          </Button>
          {seller.externalShopUrl ? (
            <Button
              variant="outline"
              onClick={() => window.open(seller.externalShopUrl, '_blank')}
              className={`h-9 px-3 ${styles.outlineBorder} ${styles.outlineText} ${styles.outlineHover} gap-1`}
            >
              <ExternalLink className="h-3 w-3" />
              Visit
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => onViewSeller(seller.id)}
              className={`h-9 px-4 ${styles.outlineBorder} ${styles.outlineText} ${styles.outlineHover}`}
            >
              Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IndependentSellerCard;