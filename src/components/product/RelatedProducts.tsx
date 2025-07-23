import React from 'react';
import { GlassCard } from '@/components/glass';
import FlowShipProductCard from '@/components/flowship/FlowShipProductCard';
import { FlowShipProduct } from '@/types/flowship';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RelatedProductsProps {
  products: FlowShipProduct[];
  title: string;
  viewAllLink?: string;
  className?: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  title,
  viewAllLink,
  className
}) => {
  const navigate = useNavigate();

  if (!products.length) return null;

  return (
    <GlassCard className={`p-6 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          {viewAllLink && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(viewAllLink)}
              className="text-neon-blue hover:text-neon-blue/80 hover:bg-neon-blue/10"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => (
            <FlowShipProductCard
              key={product.id}
              product={product}
              showCheckbox={false}
              className="h-full"
            />
          ))}
        </div>

        {products.length > 4 && !viewAllLink && (
          <div className="text-center pt-4">
            <span className="text-sm text-muted-foreground">
              Showing 4 of {products.length} products
            </span>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default RelatedProducts;