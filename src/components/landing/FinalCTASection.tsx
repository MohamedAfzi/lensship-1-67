import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GlassCardFull } from '@/components/glass';

interface FinalCTASectionProps {
  onContactModal: (type: string) => void;
}

const FinalCTASection = ({ onContactModal }: FinalCTASectionProps) => {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-neon-blue/10 to-transparent backdrop-blur-sm">
      <div className="container mx-auto text-center">
        <GlassCardFull 
          variant="glow"
          hover="float"
          className="max-w-4xl mx-auto gpu-accelerated"
        >
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to streamline your <span className="text-neon-blue">product flows?</span>
            </h2>
            <p className="text-xl text-foreground/80">
              Get started in 2 minutes. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-neon-blue hover:bg-neon-blue/90 text-background font-semibold hover:scale-105 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-neon-blue/80 focus-visible:ring-offset-2"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-neon-blue text-neon-blue hover:bg-neon-blue/10 hover:scale-105 transition-all duration-200 backdrop-blur-sm bg-card/20 focus-visible:ring-2 focus-visible:ring-neon-blue/80 focus-visible:ring-offset-2"
                onClick={() => onContactModal('sales')}
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </GlassCardFull>
      </div>
    </section>
  );
};

export default FinalCTASection;