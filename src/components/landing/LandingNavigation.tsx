import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GlassNavigation } from '@/components/glass';
import MobileMenu from '@/components/navigation/MobileMenu';

interface LandingNavigationProps {
  onContactDemo: () => void;
}

const LandingNavigation = ({ onContactDemo }: LandingNavigationProps) => {
  return (
    <GlassNavigation>
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold text-neon-blue">LensShip</div>
        <div className="hidden md:flex space-x-6 lg:space-x-8">
          <a href="#features" className="text-foreground/80 hover:text-neon-blue transition-colors focus-ring rounded px-2 py-1">Features</a>
          <a href="#how-it-works" className="text-foreground/80 hover:text-neon-blue transition-colors focus-ring rounded px-2 py-1">How It Works</a>
          <a href="#pricing" className="text-foreground/80 hover:text-neon-blue transition-colors focus-ring rounded px-2 py-1">Pricing</a>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden md:flex space-x-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-foreground hover:bg-card/30 backdrop-blur-sm focus-ring">Log In</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-neon-blue hover:bg-neon-blue/90 text-background hover:scale-105 transition-transform focus-ring">Get Started</Button>
            </Link>
          </div>
          <MobileMenu onContactDemo={onContactDemo} />
        </div>
      </div>
    </GlassNavigation>
  );
};

export default LandingNavigation;