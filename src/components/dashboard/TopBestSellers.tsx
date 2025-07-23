import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, Star, Eye, Building2, Store, ShoppingCart, Users } from 'lucide-react';
import { GlassCard } from '@/components/glass';
import { mockSupplierHubs, mockIndependentSellers } from '@/data/flowshipData';
import type { Supplier } from '@/types/flowship';

interface FlowShipEntity {
  id: string;
  name: string;
  entityType: 'retailSeller' | 'shoppingCenter' | 'commercialMall' | 'supermarket';
  totalProducts: number;
  rating: number;
  region: string;
  verified: boolean;
  trend: 'up' | 'down';
  trendPercentage: number;
  featuredProductId: string;
}

const TopBestSellers = () => {
  const navigate = useNavigate();

  // Get one entity from each type for the top 4
  const getTopEntitiesByType = (): FlowShipEntity[] => {
    const allEntities = [...mockSupplierHubs, ...mockIndependentSellers] as Supplier[];
    
    // Group by entity type with featured products
    const entityTypes = ['supermarket', 'commercialMall', 'shoppingCenter', 'retailSeller'] as const;
    const featuredProducts = ['product-1', 'product-6', 'product-10', 'product-15']; // Featured products for each type
    const topEntities: FlowShipEntity[] = [];
    
    entityTypes.forEach((type, index) => {
      const entitiesOfType = allEntities.filter(entity => entity.entityType === type);
      if (entitiesOfType.length > 0) {
        // Sort by total products (descending) and take the top one
        const topEntity = entitiesOfType.sort((a, b) => b.totalProducts - a.totalProducts)[0];
        topEntities.push({
          id: topEntity.id,
          name: topEntity.name,
          entityType: topEntity.entityType,
          totalProducts: topEntity.totalProducts,
          rating: topEntity.rating,
          region: topEntity.region,
          verified: topEntity.verified,
          trend: Math.random() > 0.5 ? 'up' : 'down', // Random for demo
          trendPercentage: Math.floor(Math.random() * 20) + 1, // Random 1-20%
          featuredProductId: featuredProducts[index] || 'product-1' // Assign featured product
        });
      }
    });
    
    return topEntities.slice(0, 4); // Ensure exactly 4 entities
  };

  const topEntities = getTopEntitiesByType();

  const getEntityIcon = (entityType: string) => {
    switch (entityType) {
      case 'supermarket': return Store;
      case 'commercialMall': return Building2;
      case 'shoppingCenter': return ShoppingCart;
      case 'retailSeller': return Users;
      default: return Store;
    }
  };

  const getEntityTypeLabel = (entityType: string) => {
    switch (entityType) {
      case 'supermarket': return 'Supermarket';
      case 'commercialMall': return 'Commercial Mall';
      case 'shoppingCenter': return 'Shopping Center';
      case 'retailSeller': return 'Retail Seller';
      default: return 'Entity';
    }
  };

  const getEntityBackground = (entityType: string) => {
    switch (entityType) {
      case 'supermarket': return 'from-green-500/20 to-emerald-500/20';
      case 'commercialMall': return 'from-blue-500/20 to-cyan-500/20';
      case 'shoppingCenter': return 'from-purple-500/20 to-violet-500/20';
      case 'retailSeller': return 'from-orange-500/20 to-red-500/20';
      default: return 'from-neon-blue/20 to-purple-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-br from-neon-blue/20 to-purple-500/30 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
          <Star className="w-6 h-6 text-neon-blue" />
        </div>
        <div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-neon-blue via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Top FlowShip Entities
        </h3>
        <p className="text-muted-foreground text-sm">
          Leading suppliers across different entity types
        </p>
        </div>
      </div>

      <GlassCard
        variant="glow"
        size="large"
        hover="none"
        className="bg-gradient-to-br from-neon-blue/5 via-purple-500/10 to-transparent border-0 rounded-2xl p-6"
      >
          {/* Desktop Grid Layout */}
          <div className="hidden md:grid md:grid-cols-4 gap-6">
            {topEntities.map((entity, index) => {
              const EntityIcon = getEntityIcon(entity.entityType);
              return (
                <GlassCard
                  key={entity.id}
                  variant="glow"
                  size="large"
                  hover="scale"
                  className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-black/40 via-neon-blue/10 to-transparent border border-neon-blue/20 hover:border-neon-blue/50 rounded-2xl p-4`}
                  onClick={() => navigate(`/product/${entity.featuredProductId}`)}
                >
                  <div className="space-y-4">
                    {/* Entity Icon with Rank */}
                    <div className="relative">
                      <div className={`w-full h-24 rounded-xl overflow-hidden relative bg-gradient-to-br ${getEntityBackground(entity.entityType)} flex items-center justify-center`}>
                        <EntityIcon className="w-12 h-12 text-white/80" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        <div className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold backdrop-blur-sm ${
                          index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' :
                          index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 shadow-md' :
                          index === 2 ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm' :
                          'bg-gradient-to-r from-neon-blue/80 to-purple-500/80 text-white'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                    </div>
                    
                    {/* Entity Info */}
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <h4 className="text-white text-sm font-bold line-clamp-2 group-hover:text-neon-blue transition-colors duration-300">
                          {entity.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {getEntityTypeLabel(entity.entityType)}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 backdrop-blur-sm">
                          <span className="text-muted-foreground text-xs">Products</span>
                          <span className="text-white text-xs font-medium">
                            {entity.totalProducts.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 backdrop-blur-sm">
                          <span className="text-muted-foreground text-xs">Rating</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-yellow-400 text-xs font-bold">
                              {entity.rating}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center gap-1 p-2 rounded-lg bg-black/30 backdrop-blur-sm">
                          {entity.trend === 'up' ? (
                            <TrendingUp className="w-3 h-3 text-green-400" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-400" />
                          )}
                          <span className={`text-xs font-medium ${entity.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                            {entity.trendPercentage}%
                          </span>
                        </div>
                      </div>

                      {/* View Details Indicator */}
                      <div className="flex items-center justify-center pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-1 text-xs text-neon-blue">
                          <Eye className="w-3 h-3" />
                          <span>View Product</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Mobile Horizontal Scroll Layout */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {topEntities.map((entity, index) => {
                const EntityIcon = getEntityIcon(entity.entityType);
                return (
                  <GlassCard
                    key={entity.id}
                    variant="glow"
                    size="large"
                    hover="scale"
                    className="group cursor-pointer transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-black/40 via-neon-blue/10 to-transparent border border-neon-blue/20 hover:border-neon-blue/50 rounded-2xl p-4 flex-shrink-0 w-48"
                    onClick={() => navigate(`/product/${entity.featuredProductId}`)}
                  >
                    <div className="space-y-4">
                      {/* Entity Icon with Rank */}
                      <div className="relative">
                        <div className={`w-full h-28 rounded-xl overflow-hidden relative bg-gradient-to-br ${getEntityBackground(entity.entityType)} flex items-center justify-center`}>
                          <EntityIcon className="w-12 h-12 text-white/80" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                          <div className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold backdrop-blur-sm ${
                            index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' :
                            index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 shadow-md' :
                            index === 2 ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm' :
                            'bg-gradient-to-r from-neon-blue/80 to-purple-500/80 text-white'
                          }`}>
                            {index + 1}
                          </div>
                        </div>
                      </div>
                      
                      {/* Entity Info */}
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <h4 className="text-white text-sm font-bold line-clamp-2 group-hover:text-neon-blue transition-colors duration-300">
                            {entity.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {getEntityTypeLabel(entity.entityType)}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 backdrop-blur-sm">
                            <span className="text-muted-foreground text-xs">Products</span>
                            <span className="text-white text-xs font-medium">
                              {entity.totalProducts > 1000 ? `${Math.floor(entity.totalProducts / 1000)}k` : entity.totalProducts}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between p-2 rounded-lg bg-black/30 backdrop-blur-sm">
                            <span className="text-muted-foreground text-xs">Rating</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-yellow-400 text-xs font-bold">
                                {entity.rating}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-center gap-1 p-2 rounded-lg bg-black/30 backdrop-blur-sm">
                            {entity.trend === 'up' ? (
                              <TrendingUp className="w-3 h-3 text-green-400" />
                            ) : (
                              <TrendingDown className="w-3 h-3 text-red-400" />
                            )}
                            <span className={`text-xs font-medium ${entity.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                              {entity.trendPercentage}%
                            </span>
                          </div>
                        </div>

                        {/* View Details Indicator */}
                        <div className="flex items-center justify-center pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center gap-1 text-xs text-neon-blue">
                            <Eye className="w-3 h-3" />
                            <span>View Product</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </GlassCard>
      </div>
    );
};

export default TopBestSellers;