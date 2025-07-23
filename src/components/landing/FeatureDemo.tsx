import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/glass';
import { 
  Camera, 
  FileText, 
  Truck, 
  Shield, 
  BarChart3, 
  Wifi,
  QrCode,
  Scan,
  DollarSign,
  MapPin,
  CheckCircle,
  X
} from 'lucide-react';

interface FeatureDemoProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  };
}

const FeatureDemo = ({ isOpen, onClose, feature }: FeatureDemoProps) => {
  const [demoStep, setDemoStep] = useState(0);

  // Add null check to prevent crashes
  if (!feature) {
    return null;
  }

  const getDemoContent = () => {
    switch (feature.id) {
      case 'ai-scan':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-neon-blue/20 to-neon-blue/5 rounded-xl flex items-center justify-center animate-glass-pulse">
                <Camera className="w-16 h-16 text-neon-blue" />
              </div>
              <p className="mt-4 text-foreground/80">Point camera at any product</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <GlassCard variant="default" className="p-4">
                <div className="flex items-center space-x-2">
                  <Scan className="w-5 h-5 text-neon-blue" />
                  <span className="text-sm">AI Recognition: 99.7%</span>
                </div>
              </GlassCard>
              <GlassCard variant="default" className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-neon-green" />
                  <span className="text-sm">Scan Complete</span>
                </div>
              </GlassCard>
            </div>
          </div>
        );

      case 'auto-invoice':
        return (
          <div className="space-y-6">
            <GlassCard variant="glow" className="p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-neon-blue" />
                Auto-Generated Invoice
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Product Cost:</span>
                  <span className="text-neon-blue">$24.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Profit Margin (40%):</span>
                  <span className="text-neon-green">$9.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>$5.99</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-semibold">
                  <span>Total Price:</span>
                  <span className="text-neon-blue">$40.97</span>
                </div>
              </div>
            </GlassCard>
          </div>
        );

      case 'dropgo-delivery':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-neon-blue/20 to-neon-blue/5 rounded-full flex items-center justify-center animate-glass-float">
                <Truck className="w-8 h-8 text-neon-blue" />
              </div>
              <h4 className="mt-4 font-semibold">DropGo Network Active</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-card/50 rounded-lg">
                <MapPin className="w-5 h-5 text-neon-blue" />
                <div>
                  <p className="font-medium">Driver Assigned</p>
                  <p className="text-sm text-foreground/60">Alex M. - 4.9★ rating</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-card/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-neon-green" />
                <div>
                  <p className="font-medium">ETA: 15 minutes</p>
                  <p className="text-sm text-foreground/60">Real-time tracking enabled</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'qr-security':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-neon-blue/20 to-neon-blue/5 rounded-lg flex items-center justify-center animate-glass-pulse">
                <QrCode className="w-16 h-16 text-neon-blue" />
              </div>
              <p className="mt-4 text-foreground/80">Encrypted QR Code Generated</p>
            </div>
            <GlassCard variant="default" className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Security Level:</span>
                  <span className="text-neon-green font-medium">Military Grade</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Encryption:</span>
                  <span className="text-neon-blue font-medium">AES-256</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Expires:</span>
                  <span className="text-foreground/60">30 minutes</span>
                </div>
              </div>
            </GlassCard>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <GlassCard variant="default" className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-neon-blue" />
                  <span className="font-medium">Revenue</span>
                </div>
                <p className="text-2xl font-bold text-neon-blue">$12,847</p>
                <p className="text-sm text-neon-green">+23% this month</p>
              </GlassCard>
              <GlassCard variant="default" className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-neon-green" />
                  <span className="font-medium">Profit</span>
                </div>
                <p className="text-2xl font-bold text-neon-green">$4,621</p>
                <p className="text-sm text-neon-blue">+18% this month</p>
              </GlassCard>
            </div>
            <GlassCard variant="glow" className="p-4">
              <h4 className="font-semibold mb-2">Top Products Today</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Wireless Headphones</span>
                  <span className="text-neon-blue font-medium">47 sales</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Smart Watch</span>
                  <span className="text-neon-blue font-medium">32 sales</span>
                </div>
              </div>
            </GlassCard>
          </div>
        );

      case 'offline-mode':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-neon-blue/20 to-neon-blue/5 rounded-full flex items-center justify-center">
                <Wifi className="w-8 h-8 text-neon-blue" />
              </div>
              <h4 className="mt-4 font-semibold">Offline Mode Active</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-card/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-neon-green" />
                <span>Scanned products: 12</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-card/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-neon-green" />
                <span>Pending sync: 8 items</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-card/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-neon-blue" />
                <span>Auto-sync when online</span>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Demo content for {feature.title}</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-background/95 backdrop-blur-xl border-neon-blue/20">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-neon-blue">
            {feature.icon}
            <span>{feature.title} Demo</span>
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 hover:bg-neon-blue/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>
        <div className="py-6">
          {getDemoContent()}
        </div>
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={onClose} className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10">
            Close Demo
          </Button>
          <Button className="bg-neon-blue hover:bg-neon-blue/90 text-background">
            Try It Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureDemo;