import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      path: '/',
      icon: Home,
      label: 'Home',
    },
    {
      path: '/listings',
      icon: Package,
      label: 'Products',
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-md border-t border-white/20 z-40">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation(item.path)}
            className={`flex flex-col items-center gap-1 h-12 px-3 ${
              isActive(item.path)
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};