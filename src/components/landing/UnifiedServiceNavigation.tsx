
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { GlassNavigation } from '@/components/glass';
import { cn } from '@/lib/utils';
import { useService } from '@/contexts/ServiceContext';
import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { navigationConfigs, globalNavigationLinks } from '@/config/navigationConfig';
import HelpButton from '@/components/navigation/HelpButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface UnifiedServiceNavigationProps {
  onContactDemo?: () => void;
  showFullNavigation?: boolean;
}

const UnifiedServiceNavigation = ({ 
  onContactDemo, 
  showFullNavigation = true 
}: UnifiedServiceNavigationProps) => {
  const location = useLocation();
  const { currentService, setCurrentService, serviceBrand } = useService();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const config = navigationConfigs[currentService];

  // Update service based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('flowship')) {
      setCurrentService('flowship');
    } else if (path.includes('dropgo')) {
      setCurrentService('dropgo');
    } else if (path === '/landing' || path === '/') {
      setCurrentService('lensship');
    }
  }, [location.pathname, setCurrentService]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const getServiceButtonProps = (route: string, colorClass: string, cssVar: string) => {
    const isActive = location.pathname === route;
    const baseClass = "relative font-semibold px-3 sm:px-4 md:px-6 py-2 rounded-lg transition-all duration-300 focus-ring text-sm sm:text-base";
    
    if (isActive) {
      return {
        className: cn(baseClass, colorClass, "text-background font-bold shadow-lg"),
        style: {}
      };
    }
    
    return {
      className: cn(baseClass, "text-foreground/80 border backdrop-blur-sm hover:scale-105"),
      style: {
        borderColor: `hsl(var(--${cssVar}) / 0.3)`,
        color: 'hsl(var(--foreground) / 0.8)'
      },
      onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.borderColor = `hsl(var(--${cssVar}) / 0.6)`;
        e.currentTarget.style.backgroundColor = `hsl(var(--${cssVar}) / 0.1)`;
        e.currentTarget.style.color = `hsl(var(--${cssVar}))`;
      },
      onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.borderColor = `hsl(var(--${cssVar}) / 0.3)`;
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = 'hsl(var(--foreground) / 0.8)';
      }
    };
  };

  const getAuthButtonStyle = (isPrimary: boolean = false) => {
    if (isPrimary) {
      return {
        backgroundColor: serviceBrand.primaryColor,
        color: 'hsl(var(--background))',
        borderColor: serviceBrand.primaryColor
      };
    }
    return {
      borderColor: `${serviceBrand.primaryColor}40`,
      color: serviceBrand.primaryColor
    };
  };

  const ServiceLinks = () => (
    <>
      <Link to="/flowship-landing">
        <Button 
          variant="ghost" 
          size="sm" 
          {...getServiceButtonProps('/flowship-landing', 'bg-neon-green', 'neon-green')}
        >
          FlowShip
        </Button>
      </Link>
      
      <Link to="/landing">
        <Button 
          variant="ghost" 
          size="sm" 
          {...getServiceButtonProps('/landing', 'bg-neon-blue', 'neon-blue')}
        >
          LensShip
        </Button>
      </Link>
      
      <Link to="/dropgo">
        <Button 
          variant="ghost" 
          size="sm" 
          {...getServiceButtonProps('/dropgo', 'bg-neon-yellow', 'neon-yellow')}
        >
          DropGo
        </Button>
      </Link>
    </>
  );

  const ServiceNavigation = () => {
    if (!showFullNavigation || !config) return null;

    return (
      <div className="hidden lg:flex items-center space-x-6">
        {config.serviceLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-foreground/80 hover:text-foreground transition-colors focus-ring rounded px-2 py-1"
          >
            {link.label}
          </a>
        ))}
        
        {/* Company Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-foreground">
              Company
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {globalNavigationLinks.company.map((link) => (
              <DropdownMenuItem key={link.href} asChild>
                <Link to={link.href} className="w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  const AuthButtons = () => (
    <>
      <Link to="/login">
        <Button 
          variant="ghost" 
          size="sm" 
          className="backdrop-blur-sm hover:scale-105 transition-transform focus-ring border w-full sm:w-auto"
          style={getAuthButtonStyle()}
        >
          Log In
        </Button>
      </Link>
      <Link to="/register">
        <Button 
          size="sm" 
          className="hover:scale-105 transition-transform focus-ring w-full sm:w-auto"
          style={getAuthButtonStyle(true)}
        >
          Sign Up
        </Button>
      </Link>
    </>
  );

  return (
    <GlassNavigation>
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground flex-shrink-0">
            Logo
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              {/* Service Switcher */}
              <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
                <ServiceLinks />
              </div>

              {/* Service-specific Navigation */}
              <ServiceNavigation />

              {/* Help & Auth buttons */}
              <div className="flex items-center space-x-2 md:space-x-4">
                <HelpButton variant="minimal" onHelpClick={onContactDemo} />
                <AuthButtons />
              </div>
            </>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <div className="flex items-center space-x-2">
              <HelpButton variant="minimal" onHelpClick={onContactDemo} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex-shrink-0"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="mt-4 pt-4 border-t border-border/20 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {/* Service Links */}
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-foreground/60 font-medium">Services</span>
                <div className="grid grid-cols-3 gap-2">
                  <ServiceLinks />
                </div>
              </div>

              {/* Service Navigation */}
              {showFullNavigation && config && (
                <div className="flex flex-col space-y-2 pt-3 border-t border-border/10">
                  <span className="text-sm text-foreground/60 font-medium">
                    {config.serviceName} Navigation
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {config.serviceLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="text-sm text-foreground/80 hover:text-foreground transition-colors p-2 rounded"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Auth Buttons */}
              <div className="flex flex-col space-y-2 pt-3 border-t border-border/10">
                <AuthButtons />
              </div>
            </div>
          </div>
        )}
      </div>
    </GlassNavigation>
  );
};

export default UnifiedServiceNavigation;
