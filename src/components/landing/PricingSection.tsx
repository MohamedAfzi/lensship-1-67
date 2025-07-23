import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/glass';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { pricingPlans } from '@/data/landingData';
import { cn } from '@/lib/utils';
import GlassPricingCard from './GlassPricingCard';

interface PricingSectionProps {
  onPricingModal: (plan?: string) => void;
  onContactModal: (type: string) => void;
}

const PricingSection = ({ onPricingModal, onContactModal }: PricingSectionProps) => {
  const navigate = useNavigate();
  const pricingObserver = useIntersectionObserver({ threshold: 0.1 });

  const handlePlanAction = (plan: any) => {
    if (plan.actionType === 'navigate') {
      navigate(plan.actionRoute);
    } else if (plan.actionType === 'modal') {
      if (plan.actionData.type === 'pricing') {
        onPricingModal(plan.actionData.plan);
      } else if (plan.actionData.type === 'contact') {
        onContactModal(plan.actionData.contactType);
      }
    }
  };

  return (
    <section 
      id="pricing" 
      ref={pricingObserver.targetRef}
      className="py-24 px-6 bg-mobile-surface/30 backdrop-blur-sm"
    >
      <div className="container mx-auto">
        <div className={`text-center mb-16 ${pricingObserver.isIntersecting ? 'animate-glass-entrance' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-neon-blue">Plan</span>
          </h2>
          <p className="text-xl text-foreground/70">Start free, scale as you grow</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto glass-stack md:glass-stack-reset">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                pricingObserver.isIntersecting 
                  ? 'opacity-100' 
                  : 'opacity-0',
                "transition-opacity duration-500"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <GlassPricingCard
                plan={plan}
                index={index}
                onPricingModal={onPricingModal}
                onContactModal={onContactModal}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;