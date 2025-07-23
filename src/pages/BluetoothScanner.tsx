import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bluetooth, Search, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import BackButton from '@/components/navigation/BackButton';

interface BluetoothDevice {
  id: string;
  name: string;
  type: 'paired' | 'unpaired';
  status: 'available' | 'connecting' | 'connected';
}

export default function BluetoothScanner() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  // Mock device discovery
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => {
        setDevices([
          { id: '1', name: 'BT-Scanner-A1', type: 'paired', status: 'available' },
          { id: '2', name: 'BT-Scanner-B2', type: 'unpaired', status: 'available' },
          { id: '3', name: 'Scanner-Pro-C3', type: 'unpaired', status: 'available' },
        ]);
        setIsScanning(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isScanning]);

  const handleConnect = async (deviceId: string) => {
    setDevices(prev => prev.map(d => 
      d.id === deviceId ? { ...d, status: 'connecting' } : d
    ));

    // Mock connection
    setTimeout(() => {
      setDevices(prev => prev.map(d => 
        d.id === deviceId ? { ...d, status: 'connected', type: 'paired' } : d
      ));
      toast({
        title: "Scanner Connected",
        description: "Bluetooth scanner paired successfully",
      });
    }, 1500);
  };

  const startDiscovery = () => {
    setIsScanning(true);
    setDevices([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-mobile-header border-b border-mobile-border">
        <BackButton />
        <h1 className="text-lg font-semibold text-foreground">Bluetooth Scanner</h1>
        <div className="w-10" />
      </div>

      <div className="p-4 space-y-6">
        {/* Status Card */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bluetooth className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="font-medium">Bluetooth Scanner Discovery</h3>
                <p className="text-sm text-muted-foreground">
                  Find and pair with Bluetooth scanners
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
            <p className="text-foreground font-medium">Scanning for devices...</p>
            <p className="text-sm text-muted-foreground mt-2">
              Performing BLE discovery
            </p>
          </Card>
        )}

        {/* Device List */}
        {devices.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Bluetooth Devices</h3>
            {devices.map((device) => (
              <Card key={device.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bluetooth className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {device.type === 'paired' ? 'Paired Device' : 'New Device'}
                      </p>
                    </div>
                  </div>
                  
                  {device.status === 'connected' ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm">Connected</span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleConnect(device.id)}
                      disabled={device.status === 'connecting'}
                      size="sm"
                    >
                      {device.status === 'connecting' ? 'Pairing...' : 
                       device.type === 'paired' ? 'Connect' : 'Pair'}
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
            <li>• Enable Bluetooth on your scanner device</li>
            <li>• Put scanner in pairing mode</li>
            <li>• Ensure scanner is within range (10m)</li>
            <li>• Previously paired devices will appear automatically</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}