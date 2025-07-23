import { Users, Star } from 'lucide-react';

const LandingFooter = () => {
  return (
    <footer className="py-16 px-6 border-t border-border/20 bg-mobile-surface/50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="text-2xl font-bold text-neon-blue">LensShip</div>
            <p className="text-foreground/70">
              Smart product discovery and delivery platform powered by AI.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-neon-blue" />
              </div>
              <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-neon-blue" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-neon-blue">Product</h4>
            <ul className="space-y-2 text-foreground/70">
              <li><a href="#features" className="hover:text-neon-blue transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-neon-blue transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="hover:text-neon-blue transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-neon-blue">Company</h4>
            <ul className="space-y-2 text-foreground/70">
              <li><a href="#" className="hover:text-neon-blue transition-colors">About</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-neon-blue">Legal</h4>
            <ul className="space-y-2 text-foreground/70">
              <li><a href="#" className="hover:text-neon-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-neon-blue transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/20 mt-12 pt-8 text-center text-foreground/60">
          <p>&copy; 2024 LensShip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;