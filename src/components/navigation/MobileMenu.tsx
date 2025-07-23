import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  onContactDemo: () => void;
}

const MobileMenu = ({ onContactDemo }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="sm" className="p-2 focus-ring">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-md border-border/30">
        <div className="flex flex-col space-y-6 mt-8">
          <div className="text-xl font-bold text-neon-blue mb-4">LensShip</div>
          
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-foreground hover:text-neon-blue transition-colors p-2 rounded focus-ring"
              onClick={handleLinkClick}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-foreground hover:text-neon-blue transition-colors p-2 rounded focus-ring"
              onClick={handleLinkClick}
            >
              How It Works
            </a>
            <a 
              href="#pricing" 
              className="text-foreground hover:text-neon-blue transition-colors p-2 rounded focus-ring"
              onClick={handleLinkClick}
            >
              Pricing
            </a>
          </nav>
          
          <div className="border-t border-border/30 pt-6 space-y-4">
            <Link to="/login" onClick={handleLinkClick}>
              <Button variant="ghost" className="w-full justify-start text-foreground hover:bg-card/30 focus-ring">
                Log In
              </Button>
            </Link>
            <Link to="/register" onClick={handleLinkClick}>
              <Button className="w-full bg-neon-blue hover:bg-neon-blue/90 text-background focus-ring">
                Get Started
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full border-neon-blue text-neon-blue hover:bg-neon-blue/10 focus-ring"
              onClick={() => {
                onContactDemo();
                handleLinkClick();
              }}
            >
              See Demo
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;