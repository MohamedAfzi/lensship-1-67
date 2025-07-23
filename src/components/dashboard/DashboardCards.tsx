import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import PageNotFoundModal from '@/components/ui/PageNotFoundModal';
import { 
  Package, 
  Store, 
  DollarSign, 
  TrendingUp, 
  Truck,
  CreditCard 
} from 'lucide-react';

interface DashboardCard {
  title: string;
  icon: React.ComponentType<any>;
  value: string | number;
  subtitle: string;
  route: string;
  color: string;
}

const DashboardCards = () => {
  const navigate = useNavigate();
  const [showNotFoundModal, setShowNotFoundModal] = useState(false);

  const handleCardClick = (route: string) => {
    const validRoutes = ['/listings', '/subscription', '/orders/deliveries'];
    
    if (validRoutes.includes(route)) {
      navigate(route);
    } else {
      setShowNotFoundModal(true);
    }
  };

  const dashboardData: DashboardCard[] = [
    {
      title: 'Discovered Products',
      icon: Package,
      value: 12,
      subtitle: 'Products identified',
      route: '/listings',
      color: 'text-neon-blue'
    },
    {
      title: 'Subscription Status',
      icon: CreditCard,
      value: 'Free Trial',
      subtitle: '7 days left • 100 products',
      route: '/subscription',
      color: 'text-neon-blue'
    },
    {
      title: 'Inventory Count',
      icon: Package,
      value: 37,
      subtitle: 'Products in stock',
      route: '/listings',
      color: 'text-neon-blue'
    },
    {
      title: 'Store Count',
      icon: Store,
      value: 5,
      subtitle: 'Connected stores',
      route: '/stores',
      color: 'text-neon-blue'
    },
    {
      title: 'Total Inventory Value',
      icon: DollarSign,
      value: '$3,420',
      subtitle: 'Current inventory',
      route: '/inventory/value-summary',
      color: 'text-neon-blue'
    },
    {
      title: 'Expected Profit',
      icon: TrendingUp,
      value: '$1,120',
      subtitle: 'Projected earnings',
      route: '/profit-projection',
      color: 'text-neon-blue'
    },
    {
      title: 'Active Deliveries',
      icon: Truck,
      value: 8,
      subtitle: 'Orders in transit',
      route: '/orders/deliveries',
      color: 'text-neon-blue'
    }
  ];

  return (
    <div className="mb-8 slide-in-right">
        <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-gradient-to-b from-neon-blue to-neon-blue/60 rounded-full"></div>
        <h2 className="text-xl font-semibold text-foreground">Analytics Overview</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {dashboardData.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Card 
              key={index}
              className="group bg-gradient-to-br from-black to-[#121212] border border-neon-blue/20 hover:border-neon-blue/50 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-neon-blue/30 relative overflow-hidden"
              onClick={() => handleCardClick(card.route)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardContent className="p-5 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-blue/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <IconComponent className={`h-5 w-5 ${card.color} transition-all duration-300 group-hover:filter group-hover:drop-shadow-[0_0_8px_currentColor]`} />
                  </div>
                  <div className="w-2 h-2 bg-neon-blue rounded-full opacity-60 group-hover:opacity-100 animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/90 font-medium text-sm leading-tight group-hover:text-foreground transition-colors duration-300">
                    {card.title}
                  </p>
                  <p className="text-foreground text-2xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                    {card.value}
                  </p>
                  <p className="text-muted-foreground text-xs leading-tight group-hover:text-muted-foreground/90 transition-colors duration-300">
                    {card.subtitle}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <PageNotFoundModal 
        isOpen={showNotFoundModal} 
        onClose={() => setShowNotFoundModal(false)} 
      />
    </div>
  );
};

export default DashboardCards;