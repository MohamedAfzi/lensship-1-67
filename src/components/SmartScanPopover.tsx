import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wifi, Bluetooth, Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SmartScanPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SmartScanPopover({ isOpen, onClose }: SmartScanPopoverProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleScanMode = (mode: string) => {
    onClose();
    if (mode === 'camera') {
      navigate('/camera-scan');
    } else if (mode === 'wifi') {
      navigate('/wifi-scanner');
    } else if (mode === 'bluetooth') {
      navigate('/bluetooth-scanner');
    }
  };

  return (
    <div 
      className="fixed bottom-36 left-6 z-50"
      onClick={(e) => {
        // Only close if clicking the container itself, not its children
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Glassmorphic 3D Popup */}
      <Card className="w-80 p-4 animate-scale-in bg-card/10 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
        
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start h-12 text-left bg-card/5 backdrop-blur-lg border-primary/20 hover:bg-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-102"
            onClick={() => handleScanMode('wifi')}
          >
            <Wifi className="h-4 w-4 mr-3 text-blue-500" />
            <div>
              <div className="font-medium text-sm">Wi-Fi Scanner</div>
              <div className="text-xs text-muted-foreground">Connect to Wi-Fi barcode scanner</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start h-12 text-left bg-card/5 backdrop-blur-lg border-primary/20 hover:bg-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-102"
            onClick={() => handleScanMode('bluetooth')}
          >
            <Bluetooth className="h-4 w-4 mr-3 text-blue-500" />
            <div>
              <div className="font-medium text-sm">Bluetooth Scanner</div>
              <div className="text-xs text-muted-foreground">Pair Bluetooth barcode scanner</div>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start h-12 text-left bg-card/5 backdrop-blur-lg border-primary/20 hover:bg-primary/10 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-102"
            onClick={() => handleScanMode('camera')}
          >
            <Camera className="h-4 w-4 mr-3 text-green-500" />
            <div>
              <div className="font-medium text-sm">Camera Scan</div>
              <div className="text-xs text-muted-foreground">Use device camera to scan</div>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
}