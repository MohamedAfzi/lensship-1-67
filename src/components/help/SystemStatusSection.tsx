import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlassCard } from '@/components/glass';
import { 
  Server, 
  CreditCard, 
  Camera, 
  ShoppingBag, 
  Database, 
  Bell,
  Circle,
  AlertTriangle,
  XCircle,
  Settings
} from 'lucide-react';
import { systemStatuses } from '@/data/helpData';
import { SystemStatus } from '@/types/help';

const iconMap = {
  'server': Server,
  'credit-card': CreditCard,
  'camera': Camera,
  'shopping-bag': ShoppingBag,
  'database': Database,
  'bell': Bell,
};

const statusConfig = {
  online: {
    color: 'text-neon-green',
    bgColor: 'bg-neon-green/20',
    label: 'Online',
    icon: Circle
  },
  degraded: {
    color: 'text-neon-orange',
    bgColor: 'bg-neon-orange/20',
    label: 'Degraded',
    icon: AlertTriangle
  },
  offline: {
    color: 'text-destructive',
    bgColor: 'bg-destructive/20',
    label: 'Offline',
    icon: XCircle
  },
  maintenance: {
    color: 'text-neon-blue',
    bgColor: 'bg-neon-blue/20',
    label: 'Maintenance',
    icon: Settings
  }
};

const SystemStatusSection = () => {
  const getOverallStatus = () => {
    const statuses = systemStatuses.map(s => s.status);
    if (statuses.includes('offline')) return 'offline';
    if (statuses.includes('degraded')) return 'degraded';
    if (statuses.includes('maintenance')) return 'maintenance';
    return 'online';
  };

  const overallStatus = getOverallStatus();
  const overallConfig = statusConfig[overallStatus];

  return (
    <div className="space-y-6">
      {/* Overall Status Header */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full ${overallConfig.bgColor} flex items-center justify-center`}>
              <overallConfig.icon className={`h-6 w-6 ${overallConfig.color}`} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">System Status</h3>
              <p className="text-muted-foreground">
                All systems {overallStatus === 'online' ? 'operational' : overallConfig.label.toLowerCase()}
              </p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={`${overallConfig.bgColor} ${overallConfig.color} border-current`}
          >
            {overallConfig.label}
          </Badge>
        </div>
      </GlassCard>

      {/* Individual Service Status */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemStatuses.map((service) => {
          const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Server;
          const statusInfo = statusConfig[service.status];
          const StatusIcon = statusInfo.icon;

          return (
            <GlassCard key={service.service} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted/20 flex items-center justify-center">
                    <IconComponent className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">{service.service}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon className={`h-4 w-4 ${statusInfo.color}`} />
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${statusInfo.bgColor} ${statusInfo.color} border-none`}
                  >
                    {statusInfo.label}
                  </Badge>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">
                {service.description}
              </p>
              
              <p className="text-xs text-muted-foreground/60">
                Updated: {new Date(service.lastUpdated).toLocaleTimeString()}
              </p>
            </GlassCard>
          );
        })}
      </div>

      {/* Status Legend */}
      <GlassCard className="p-4">
        <h4 className="font-medium text-foreground mb-3">Status Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(statusConfig).map(([status, config]) => (
            <div key={status} className="flex items-center gap-2">
              <config.icon className={`h-4 w-4 ${config.color}`} />
              <span className="text-sm text-muted-foreground">{config.label}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default SystemStatusSection;