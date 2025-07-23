import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/navigation/BackButton';
import { Badge } from '@/components/ui/badge';
import IndependentSellerCard from '@/components/flowship/IndependentSellerCard';
import { mockSupplierHubs, mockIndependentSellers } from '@/data/flowshipData';
import type { IndependentSeller } from '@/types/flowship';

// Mall to sellers mapping
const mallToSellersMap: Record<string, string[]> = {
  "hub-2": ["seller-1", "seller-5"], // Al-Libya Mall
  "hub-4": ["seller-3", "seller-4"], // Aden Port Commercial Hub
};

const MallSellers = () => {
  const navigate = useNavigate();
  const { mallId } = useParams<{ mallId: string }>();

  // Find the mall
  const mall = useMemo(() => {
    return mockSupplierHubs.find(h => h.id === mallId);
  }, [mallId]);

  // Get sellers for this mall
  const mallSellers = useMemo(() => {
    if (!mallId || !mallToSellersMap[mallId]) return [];
    const sellerIds = mallToSellersMap[mallId];
    return mockIndependentSellers.filter(seller => sellerIds.includes(seller.id));
  }, [mallId]);

  const handleViewSeller = (sellerId: string) => {
    navigate(`/products/${sellerId}`);
  };

  const handleViewProducts = (sellerId: string) => {
    navigate(`/products/${sellerId}`);
  };

  if (!mall) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Mall Not Found</h1>
          <Button onClick={() => navigate('/flowship')}>
            Return to FlowShip
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-mobile-surface border-b border-mobile-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <BackButton fallbackRoute="/flowship" />
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-neon-blue" />
              <div>
                <h1 className="text-xl font-bold text-foreground">{mall.name}</h1>
                <p className="text-sm text-muted-foreground">Mall Retailers & Sellers</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-neon-blue/10 text-neon-blue">
                {mallSellers.length} Sellers
              </Badge>
              <Badge variant="outline" className="text-xs">
                {mall.region}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {mallSellers.length > 0 ? (
          <div className="grid gap-4">
            {mallSellers.map((seller) => (
              <IndependentSellerCard
                key={seller.id}
                seller={seller}
                onViewSeller={handleViewSeller}
                onViewProducts={handleViewProducts}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No sellers found in this mall.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MallSellers;