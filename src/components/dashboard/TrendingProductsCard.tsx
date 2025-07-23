import { useNavigate } from 'react-router-dom';
import { Flame, TrendingUp, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/glass';
import { Badge } from '@/components/ui/badge';

const TrendingProductsCard = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/top-trending-products');
  };

  return (
    <GlassCard
      variant="glow"
      size="large"
      hover="scale"
      className="group cursor-pointer transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-orange-500/10 via-red-500/20 to-pink-500/10 border-0 rounded-2xl p-6"
      onClick={handleCardClick}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/30 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
              <Flame className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                🔥 Top Trending Products
              </h3>
              <p className="text-muted-foreground text-sm">
                Most popular items in your region
              </p>
            </div>
          </div>
          
          <Badge 
            variant="secondary" 
            className="bg-orange-500/10 text-orange-400 border-orange-500/20 animate-pulse"
          >
            Hot 🔥
          </Badge>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-black/20 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                <span className="text-xs text-muted-foreground">Trending Now</span>
              </div>
              <div className="text-xl font-bold text-orange-400">50+</div>
              <div className="text-xs text-muted-foreground">Hot Products</div>
            </div>
            
            <div className="p-4 rounded-xl bg-black/20 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-yellow-400">⭐</span>
                <span className="text-xs text-muted-foreground">Rating</span>
              </div>
              <div className="text-xl font-bold text-yellow-400">4.5+</div>
              <div className="text-xs text-muted-foreground">Average Rating</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-foreground">
                  Discover trending products from verified suppliers
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Electronics • Clothing • Home & Garden • Sports
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-orange-400 font-medium">
                Explore
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Hover Indicator */}
        <div className="flex items-center justify-center pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <span>Click to explore trending products</span>
            <div className="w-1 h-1 rounded-full bg-orange-400 animate-pulse"></div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default TrendingProductsCard;