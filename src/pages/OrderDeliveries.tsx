import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/navigation/BackButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Truck, MessageCircle, MapPin, Clock } from 'lucide-react';

interface DeliveryOrder {
  id: string;
  orderId: string;
  status: 'in-transit' | 'delivered';
  customerName: string;
  deliveryAgent: {
    name: string;
    photo?: string;
  };
  estimatedTime: string;
  progress: number;
  destination: string;
  deliveredAt?: string;
}

const mockInTransitOrders: DeliveryOrder[] = [
  {
    id: '1',
    orderId: '#OD-1023',
    status: 'in-transit',
    customerName: 'John Smith',
    deliveryAgent: {
      name: 'Barry Allen',
      photo: undefined
    },
    estimatedTime: '2h 24m',
    progress: 65,
    destination: '123 Main St, Downtown'
  },
  {
    id: '2',
    orderId: '#OD-1024',
    status: 'in-transit',
    customerName: 'Sarah Johnson',
    deliveryAgent: {
      name: 'Diana Prince',
      photo: undefined
    },
    estimatedTime: '1h 45m',
    progress: 80,
    destination: '456 Oak Ave, Midtown'
  },
  {
    id: '3',
    orderId: '#OD-1025',
    status: 'in-transit',
    customerName: 'Mike Wilson',
    deliveryAgent: {
      name: 'Clark Kent',
      photo: undefined
    },
    estimatedTime: '3h 12m',
    progress: 45,
    destination: '789 Pine St, Uptown'
  }
];

const mockDeliveredOrders: DeliveryOrder[] = [
  {
    id: '4',
    orderId: '#OD-1020',
    status: 'delivered',
    customerName: 'Emma Davis',
    deliveryAgent: {
      name: 'Peter Parker',
      photo: undefined
    },
    estimatedTime: '0m',
    progress: 100,
    destination: '321 Elm St, Suburb',
    deliveredAt: '2 hours ago'
  },
  {
    id: '5',
    orderId: '#OD-1019',
    status: 'delivered',
    customerName: 'David Brown',
    deliveryAgent: {
      name: 'Tony Stark',
      photo: undefined
    },
    estimatedTime: '0m',
    progress: 100,
    destination: '654 Maple Dr, Eastside',
    deliveredAt: '4 hours ago'
  }
];

const DeliveryCard = ({ order, onClick }: { order: DeliveryOrder; onClick: () => void }) => {
  const isDelivered = order.status === 'delivered';
  
  return (
    <Card 
      className="bg-card border-border hover:border-neon-blue/50 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Badge 
              variant={isDelivered ? "secondary" : "default"}
              className={`mb-2 ${
                isDelivered 
                  ? "bg-neon-green/20 text-neon-green border-neon-green/30" 
                  : "bg-neon-blue/20 text-neon-blue border-neon-blue/30"
              }`}
            >
              {isDelivered ? 'Delivered' : 'Out for delivery'}
            </Badge>
            <p className="text-sm text-muted-foreground">{order.orderId}</p>
          </div>
          <div className="text-right">
            <p className={`text-xl font-bold ${
              isDelivered ? 'text-neon-green' : 'text-neon-green'
            }`}>
              {isDelivered ? order.deliveredAt : order.estimatedTime}
            </p>
            <p className="text-xs text-muted-foreground">
              {isDelivered ? 'Delivered' : 'Estimated'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={order.deliveryAgent.photo} />
            <AvatarFallback className="bg-neon-blue/20 text-neon-blue text-sm">
              {order.deliveryAgent.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-foreground">{order.deliveryAgent.name}</p>
            <p className="text-sm text-muted-foreground">Delivery Agent</p>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="w-8 h-8 p-0 hover:bg-neon-blue/20 hover:text-neon-blue"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-foreground">{order.destination}</p>
        </div>

        {!isDelivered && (
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-neon-green transition-all duration-500"
                style={{ width: `${order.progress}%` }}
              />
            </div>
            <Truck className="h-4 w-4 text-neon-blue" />
            <span className="text-xs text-muted-foreground">{order.progress}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const OrderDeliveries = () => {
  const navigate = useNavigate();
  const [inTransitOrders, setInTransitOrders] = useState<DeliveryOrder[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<DeliveryOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setInTransitOrders(mockInTransitOrders);
      setDeliveredOrders(mockDeliveredOrders);
      setLoading(false);
    }, 500);
  }, []);

  const handleOrderClick = (orderId: string) => {
    // Navigate to order details - placeholder for now
    console.log('Navigate to order:', orderId);
  };

  const handleNewDelivery = () => {
    navigate('/orders/new');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 bg-mobile-header border-b border-mobile-border px-4 py-3">
          <div className="flex items-center">
            <BackButton />
            <h1 className="flex-1 text-center text-lg font-semibold text-foreground pr-16">
              Active Deliveries
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-mobile-header border-b border-mobile-border px-4 py-3">
        <div className="flex items-center">
          <BackButton />
          <h1 className="flex-1 text-center text-lg font-semibold text-foreground pr-16">
            Active Deliveries
          </h1>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Status Banner */}
        <div className="bg-gradient-to-r from-neon-blue/20 to-neon-blue/10 border border-neon-blue/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-neon-blue/20 rounded-xl flex items-center justify-center">
              <Truck className="h-6 w-6 text-neon-blue" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Orders In Transit</h2>
              <p className="text-sm text-muted-foreground">
                {inTransitOrders.length} orders currently being delivered
              </p>
            </div>
          </div>
        </div>

        {/* In-Transit Orders */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-neon-blue rounded-full"></div>
            <h3 className="text-lg font-semibold text-foreground">Active Deliveries</h3>
          </div>
          
          {inTransitOrders.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No active deliveries at the moment</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {inTransitOrders.map((order) => (
                <DeliveryCard 
                  key={order.id} 
                  order={order} 
                  onClick={() => handleOrderClick(order.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Delivered Orders */}
        {deliveredOrders.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-neon-green rounded-full"></div>
              <h3 className="text-lg font-semibold text-foreground">Recent Deliveries</h3>
            </div>
            
            <div className="space-y-3">
              {deliveredOrders.slice(0, 5).map((order) => (
                <DeliveryCard 
                  key={order.id} 
                  order={order} 
                  onClick={() => handleOrderClick(order.id)}
                />
              ))}
            </div>
            
            {deliveredOrders.length > 5 && (
              <Button 
                variant="outline" 
                className="w-full border-border hover:border-neon-blue hover:text-neon-blue"
              >
                View All Delivered Orders
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button 
          onClick={handleNewDelivery}
          className="w-full bg-neon-blue hover:bg-neon-blue/90 text-white font-semibold py-3 rounded-xl"
        >
          + New Delivery
        </Button>
      </div>
    </div>
  );
};

export default OrderDeliveries;