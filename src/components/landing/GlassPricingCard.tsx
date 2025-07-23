import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { GlassCard, GlassMagnetic } from '@/components/glass';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import FeatureIcon from './FeatureIcon';

interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  features: string[];
  cta: string;
  popular: boolean;
  actionType: 'navigate' | 'modal';
  actionRoute?: string;
  actionData?: {
    type: string;
    plan?: string;
    contactType?: string;
  };
}

interface GlassPricingCardProps {
  plan: PricingPlan;
  index: number;
  onPricingModal?: (plan?: string) => void;
  onContactModal?: (type: string) => void;
  className?: string;
}

const GlassPricingCard: React.FC<GlassPricingCardProps> = ({ 
  plan, 
  index, 
  onPricingModal, 
  onContactModal, 
  className 
}) => {
  const navigate = useNavigate();

  const handlePlanAction = () => {
    if (plan.actionType === 'navigate' && plan.actionRoute) {
      navigate(plan.actionRoute);
    } else if (plan.actionType === 'modal' && plan.actionData) {
      if (plan.actionData.type === 'pricing' && onPricingModal) {
        onPricingModal(plan.actionData.plan);
      } else if (plan.actionData.type === 'contact' && onContactModal && plan.actionData.contactType) {
        onContactModal(plan.actionData.contactType);
      }
    }
  };

  return (
    <GlassMagnetic 
      strength={0.2} 
      className={cn("h-full", className)}
    >
      <GlassCard
        variant={plan.popular ? "glow" : "default"}
        hover="pulse"
        className={cn(
          "relative h-full gpu-accelerated animate-layered-rise",
          "group perspective-800 transform-style-preserve-3d",
          plan.popular 
            ? "glass-layer-3 shadow-xl shadow-neon-blue/30 scale-105" 
            : "glass-layer-2 hover:glass-layer-3"
        )}
        style={{ 
          animationDelay: `${index * 150}ms`,
          zIndex: plan.popular ? 30 : 20 - index 
        }}
      >
        {/* Popular badge */}
        {plan.popular && (
          <Badge className={cn(
            "absolute -top-3 left-1/2 transform -translate-x-1/2",
            "bg-gradient-to-r from-neon-blue to-neon-blue/80 text-background",
            "animate-glass-pulse border-neon-blue/30 shadow-lg shadow-neon-blue/40"
          )}>
            Most Popular
          </Badge>
        )}

        {/* Main content */}
        <div className="p-8 h-full flex flex-col">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              {plan.name}
            </h3>
            <div className="mb-4">
              <div className={cn(
                "text-4xl font-bold",
                plan.popular ? "text-neon-blue" : "text-foreground"
              )}>
                {plan.price}
                {plan.period && (
                  <span className="text-lg text-foreground/60 font-normal">
                    {plan.period}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="flex-1 mb-8">
            <ul className="space-y-4">
              {plan.features.map((feature, idx) => (
                <li 
                  key={idx} 
                  className={cn(
                    "flex items-center text-foreground/80 group/feature",
                    "transition-all duration-300 hover:text-foreground"
                  )}
                >
                  <FeatureIcon 
                    feature={feature} 
                    className="mr-3" 
                    size={18}
                  />
                  <span className="leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={handlePlanAction}
            className={cn(
              "w-full group relative overflow-hidden",
              "transition-all duration-300 hover:scale-105 active:scale-95",
              "focus-visible:ring-2 focus-visible:ring-offset-2",
              plan.popular 
                ? "bg-neon-blue hover:bg-neon-blue/90 text-background focus-visible:ring-neon-blue/80 shadow-lg shadow-neon-blue/30" 
                : "border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10 backdrop-blur-sm bg-card/20 focus-visible:ring-neon-blue/80 hover:border-neon-blue"
            )}
            variant={plan.popular ? 'default' : 'outline'}
          >
            <span className="relative z-10 font-semibold">
              {plan.cta}
            </span>
            
            {/* Animated background */}
            <div className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100",
              "bg-gradient-to-r from-neon-blue/20 via-neon-blue/10 to-neon-blue/20",
              "transition-opacity duration-300"
            )} />
          </Button>
        </div>

        {/* Hover glow effect */}
        <div className={cn(
          "absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100",
          "bg-gradient-to-t from-neon-blue/5 via-transparent to-neon-blue/5",
          "transition-opacity duration-500 rounded-xl"
        )} />
      </GlassCard>
    </GlassMagnetic>
  );
};

export default GlassPricingCard;