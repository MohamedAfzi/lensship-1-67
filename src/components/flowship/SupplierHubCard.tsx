import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Package, ShieldCheck } from 'lucide-react';
import { SupplierHub } from '@/types/flowship';
import { getEntityTypeStyles } from '@/lib/entity-styles';

interface SupplierHubCardProps {
  hub: SupplierHub;
  onViewHub: (id: string) => void;
  onViewProducts: (id: string) => void;
}

const SupplierHubCard = ({ hub, onViewHub, onViewProducts }: SupplierHubCardProps) => {
  const formatProductCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M+`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}k+`;
    }
    return count.toString();
  };

  const styles = getEntityTypeStyles(hub);
  const EntityIcon = styles.config.icon;

  return (
    <Card className={`group ${styles.cardHover} transition-all duration-300 hover:scale-[1.02] bg-mobile-surface border-mobile-border overflow-hidden`}>
      <CardContent className="p-0">
        {/* Header with circular logo */}
        <div className="relative p-4 pb-2">
          <div className="flex items-center gap-4">
            {/* Circular Logo */}
            <div className="relative">
              <div className={`w-20 h-20 rounded-full ${styles.bgGradient} ${styles.borderTheme} flex items-center justify-center overflow-hidden shadow-lg`}>
                {hub.logo ? (
                  <img 
                    src={hub.logo} 
                    alt={hub.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <EntityIcon className={`h-10 w-10 ${styles.primaryColor}`} />
                )}
              </div>
              {/* Trust Badge Overlay */}
              {hub.verified && (
                <div className="absolute -top-1 -right-1 z-10">
                  <div className={`w-7 h-7 rounded-full bg-${styles.config.color} border-2 border-background flex items-center justify-center shadow-lg animate-pulse`}>
                    <ShieldCheck className="h-4 w-4 text-background" />
                  </div>
                </div>
              )}
            </div>

            {/* Hub Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-lg text-foreground leading-tight">
                  {hub.name}
                </h3>
                {hub.verified && (
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
                  <span className="font-semibold text-sm">{hub.rating}</span>
                </div>
                <span className="text-muted-foreground text-xs">•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground capitalize">{hub.region} – Zubairi St.</span>
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
              <div className={`font-bold text-sm ${styles.statColor}`}>120+</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Products</div>
              <div className={`font-bold text-sm ${styles.statColor}`}>{formatProductCount(hub.totalProducts)} SKUs</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Shipping</div>
              <div className={`font-bold text-sm ${styles.statColor}`}>{hub.shippingZones.length} Zones</div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 py-2">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {hub.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="p-4 pt-2 flex gap-2">
          <Button
            onClick={() => {
              // If commercial mall, show sellers; otherwise show products
              if (hub.entityType === 'commercialMall') {
                onViewHub(`/mall/${hub.id}/sellers`);
              } else {
                onViewProducts(hub.id);
              }
            }}
            className={`flex-1 h-9 ${styles.buttonGradient} ${styles.buttonHover} shadow-lg ${styles.cardHover} transition-all duration-300`}
          >
            {hub.entityType === 'commercialMall' ? 'View Sellers' : 'View Products'}
          </Button>
          <Button
            variant="outline"
            onClick={() => onViewHub(hub.id)}
            className={`h-9 px-4 ${styles.outlineBorder} ${styles.outlineText} ${styles.outlineHover}`}
          >
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplierHubCard;