import { Button } from '@/components/ui/button';
import { Play, ArrowRight } from 'lucide-react';
import { GlassCardFull } from '@/components/glass';
import { steps } from '@/data/landingData';

interface LiveDemoSectionProps {
  onHowItWorksDemo: (step: any) => void;
}

const LiveDemoSection = ({ onHowItWorksDemo }: LiveDemoSectionProps) => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 animate-glass-entrance">
          See It In <span className="text-neon-blue">Action</span>
        </h2>
        <GlassCardFull 
          variant="glow"
          hover="float"
          className="max-w-2xl mx-auto glass-layer-2"
        >
          <div className="p-12 space-y-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-neon-blue/20 to-transparent rounded-full flex items-center justify-center animate-glass-pulse">
              <Play className="w-16 h-16 text-neon-blue" />
            </div>
            <h3 className="text-2xl font-bold">Interactive Demo</h3>
            <p className="text-foreground/70">
              Experience the full LensShip workflow in our interactive demo
            </p>
            <Button 
              size="lg" 
              className="bg-neon-blue hover:bg-neon-blue/90 hover:scale-105 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-neon-blue/80 focus-visible:ring-offset-2"
              onClick={() => onHowItWorksDemo(steps[0])}
            >
              Launch Demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </GlassCardFull>
      </div>
    </section>
  );
};

export default LiveDemoSection;