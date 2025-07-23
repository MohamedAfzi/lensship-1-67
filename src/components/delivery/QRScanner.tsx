import { useState, useEffect, useRef } from 'react';
import { X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import QrScanner from 'qr-scanner';

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
  title?: string;
}

export const QRScanner = ({ isOpen, onClose, onScan, title = "Scan QR Code" }: QRScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanner, setScanner] = useState<QrScanner | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      const qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          onScan(result.data);
          onClose();
        },
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      setScanner(qrScanner);

      qrScanner.start().then(() => {
        setHasPermission(true);
      }).catch(() => {
        setHasPermission(false);
      });

      return () => {
        qrScanner.stop();
        qrScanner.destroy();
      };
    }
  }, [isOpen, onScan, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-mobile-header border-b border-mobile-border">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-foreground hover:bg-accent"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scanner */}
        <div className="flex-1 relative">
          {hasPermission === false ? (
            <Card className="m-4">
              <CardContent className="p-8 text-center">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">Camera Permission Required</h3>
                <p className="text-sm text-muted-foreground">
                  Please allow camera access to scan QR codes
                </p>
              </CardContent>
            </Card>
          ) : (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
          )}
          
          {/* Scanning overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 border-2 border-neon-blue rounded-lg relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-blue rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-blue rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-blue rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-blue rounded-br-lg"></div>
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-neon-blue opacity-50 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4 bg-card/50 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            Position the QR code within the frame to scan
          </p>
        </div>
      </div>
    </div>
  );
};