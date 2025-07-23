import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/glass';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { features } from '@/data/landingData';

interface FeaturesSectionProps {
  onFeatureDemo: (feature: any) => void;
}

const FeaturesSection = ({ onFeatureDemo }: FeaturesSectionProps) => {
  const navigate = useNavigate();
  const featuresObserver = useIntersectionObserver({ threshold: 0.1 });

  const handleFeatureClick = (feature: any) => {
    if (feature.route) {
      navigate(feature.route);
    } else {
      onFeatureDemo(feature);
    }
  };

  return (
    <section 
      id="features" 
      ref={featuresObserver.targetRef}
      className="py-24 px-6"
    >
      <div className="container mx-auto">
        <div className={`text-center mb-16 ${featuresObserver.isIntersecting ? 'animate-glass-entrance' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="text-neon-blue"> Scale Fast</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Powerful features designed to streamline your product operations from scan to delivery.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 glass-stack md:glass-stack-reset">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <GlassCard
                key={index}
                variant="glow"
                hover="pulse"
                className={`text-center space-y-4 p-8 gpu-accelerated cursor-pointer transition-all duration-200 hover:scale-105 ${
                  featuresObserver.isIntersecting 
                    ? 'animate-glass-entrance' 
                    : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  zIndex: features.length - index 
                }}
                onClick={() => handleFeatureClick(feature)}
              >
                <div className="mx-auto w-16 h-16 rounded-full bg-neon-blue/10 flex items-center justify-center mb-4 hover:animate-glass-float">
                  <IconComponent className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
                <div className="flex items-center justify-center text-neon-blue text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>See Demo</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;