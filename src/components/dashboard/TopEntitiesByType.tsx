import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Building2, ShoppingCart, Store, User, Star, TrendingUp } from 'lucide-react';
import { GlassCard } from '@/components/glass';
import { mockSupplierHubs, mockIndependentSellers } from '@/data/flowshipData';
import type { Supplier } from '@/types/flowship';

interface TopEntity {
  id: string;
  name: string;
  region: string;
  rating: number;
  totalSales: number;
  entityType: string;
}

const TopEntitiesByType = () => {
  const navigate = useNavigate();

  // Calculate top entities by type based on rating and simulated sales
  const calculateTopEntities = (type: string): TopEntity[] => {
    const allEntities = [...mockSupplierHubs, ...mockIndependentSellers] as Supplier[];
    
    return allEntities
      .filter(entity => entity.entityType === type)
      .map(entity => ({
        id: entity.id,
        name: entity.name,
        region: entity.region,
        rating: entity.rating,
        totalSales: Math.floor(entity.totalProducts * entity.rating * 0.1), // Simulated sales based on products and rating
        entityType: entity.entityType
      }))
      .sort((a, b) => {
        // Sort by combined score of rating and sales
        const scoreA = a.rating * 0.6 + (a.totalSales / 10000) * 0.4;
        const scoreB = b.rating * 0.6 + (b.totalSales / 10000) * 0.4;
        return scoreB - scoreA;
      })
      .slice(0, 3);
  };

  const entityTypes = [
    {
      type: 'shoppingCenter',
      title: 'Top Shopping Centers',
      icon: Store,
      gradient: 'from-blue-500 via-blue-600 to-cyan-500',
      bgGradient: 'from-blue-500/10 via-blue-600/20 to-cyan-500/10',
      iconBg: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/30'
    },
    {
      type: 'supermarket',
      title: 'Top Supermarkets',
      icon: ShoppingCart,
      gradient: 'from-green-500 via-emerald-600 to-teal-500',
      bgGradient: 'from-green-500/10 via-emerald-600/20 to-teal-500/10',
      iconBg: 'bg-gradient-to-br from-green-500/20 to-teal-500/30'
    },
    {
      type: 'commercialMall',
      title: 'Top Commercial Malls',
      icon: Building2,
      gradient: 'from-purple-500 via-violet-600 to-indigo-500',
      bgGradient: 'from-purple-500/10 via-violet-600/20 to-indigo-500/10',
      iconBg: 'bg-gradient-to-br from-purple-500/20 to-indigo-500/30'
    },
    {
      type: 'retailSeller',
      title: 'Top Independent Sellers',
      icon: User,
      gradient: 'from-orange-500 via-amber-600 to-yellow-500',
      bgGradient: 'from-orange-500/10 via-amber-600/20 to-yellow-500/10',
      iconBg: 'bg-gradient-to-br from-orange-500/20 to-yellow-500/30'
    }
  ];

  const getRegionDisplayName = (regionId: string) => {
    const regionMap: Record<string, string> = {
      sanaa: "Sana'a",
      aden: 'Aden',
      taiz: 'Taiz',
      hudaydah: 'Al Hudaydah',
      ibb: 'Ibb'
    };
    return regionMap[regionId] || regionId;
  };

  const handleEntityClick = (entityId: string) => {
    navigate(`/products/${entityId}`);
  };

  return (
    <div className="space-y-8">
      {entityTypes.map(({ type, title, icon: Icon, gradient, bgGradient, iconBg }) => {
        const topEntities = calculateTopEntities(type);
        
        if (topEntities.length === 0) return null;

        return (
          <div key={type} className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center gap-4">
              <div className={`${iconBg} backdrop-blur-sm rounded-2xl p-3 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Top performers by rating and sales volume
                </p>
              </div>
            </div>

            {/* Entity Cards Grid */}
            <div className="grid gap-6 md:grid-cols-3">
              {topEntities.map((entity, index) => (
                <GlassCard
                  key={entity.id}
                  variant="glow"
                  size="large"
                  hover="scale"
                  className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl bg-gradient-to-br ${bgGradient} border-0 rounded-2xl p-6`}
                  onClick={() => handleEntityClick(entity.id)}
                >
                  <div className="space-y-4">
                    {/* Header with Rank Badge */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-bold text-white group-hover:text-neon-blue transition-colors duration-300 line-clamp-2">
                          {entity.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse"></div>
                          <p className="text-muted-foreground text-sm">
                            {getRegionDisplayName(entity.region)}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        className={`
                          text-xs font-bold px-3 py-1 rounded-full
                          ${index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' :
                            index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md' :
                            'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm'}
                        `}
                      >
                        #{index + 1}
                      </Badge>
                    </div>
                    
                    {/* Metrics */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-muted-foreground text-sm">Rating</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-white font-bold">
                            {entity.rating.toFixed(1)}
                          </span>
                          <span className="text-yellow-400 text-sm">★</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-xl bg-black/20 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-neon-blue" />
                          <span className="text-muted-foreground text-sm">Sales</span>
                        </div>
                        <span className="text-neon-blue font-bold text-sm">
                          {entity.totalSales.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Hover Indicator */}
                    <div className="flex items-center justify-center pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <span>Click to explore</span>
                        <div className="w-1 h-1 rounded-full bg-neon-blue animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopEntitiesByType;