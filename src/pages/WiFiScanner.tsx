import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wifi, Search, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import BackButton from '@/components/navigation/BackButton';

interface Scanner {
  id: string;
  name: string;
  status: 'available' | 'connecting' | 'connected';
}

export default function WiFiScanner() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scanners, setScanners] = useState<Scanner[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  // Mock scanner discovery
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setScanners([
          { id: '1', name: 'Scanner-A1B2', status: 'available' },
          { id: '2', name: 'Scanner-C3D4', status: 'available' },
          { id: '3', name: 'Scanner-E5F6', status: 'available' },
        ]);
        setIsScanning(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  const handleConnect = async (scannerId: string) => {
    setScanners(prev => prev.map(s => 
      s.id === scannerId ? { ...s, status: 'connecting' } : s
    ));

    // Mock connection
    setTimeout(() => {
      setScanners(prev => prev.map(s => 
        s.id === scannerId ? { ...s, status: 'connected' } : s
      ));
      toast({
        title: "Scanner Connected",
        description: "Wi-Fi scanner connected successfully",
      });
    }, 1500);
  };

  const startDiscovery = () => {
    setIsScanning(true);
    setScanners([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-mobile-header border-b border-mobile-border">
        <BackButton />
        <h1 className="text-lg font-semibold text-foreground">Wi-Fi Scanner</h1>
        <div className="w-10" />
      </div>

      <div className="p-4 space-y-6">
        {/* Status Card */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wifi className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="font-medium">Wi-Fi Scanner Discovery</h3>
                <p className="text-sm text-muted-foreground">
                  Find and connect to network scanners
                </p>
              </div>
            </div>
            <Button
              onClick={startDiscovery}
              disabled={isScanning}
              variant="outline"
            >
              {isScanning ? (
                <Search className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              {isScanning ? 'Scanning...' : 'Scan'}
            </Button>
          </div>
        </Card>

        {/* Scanning Indicator */}
        {isScanning && (
          <Card className="p-6 text-center">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-foreground font-medium">Searching for scanners...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Broadcasting discovery packets
            </p>
          </Card>
        )}

        {/* Scanner List */}
        {scanners.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Available Scanners</h3>
            {scanners.map((scanner) => (
              <Card key={scanner.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Wifi className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">{scanner.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Network Scanner
                      </p>
                    </div>
                  </div>
                  
                  {scanner.status === 'connected' ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Connected</span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleConnect(scanner.id)}
                      disabled={scanner.status === 'connecting'}
                      size="sm"
                    >
                      {scanner.status === 'connecting' ? 'Connecting...' : 'Connect'}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Instructions */}
        <Card className="p-4 bg-card/50">
          <h4 className="font-medium mb-2">Instructions</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Ensure your scanner is connected to the same Wi-Fi network</li>
            <li>• Scanner should be in pairing mode</li>
            <li>• Check scanner documentation for network setup</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}