import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LiveCameraView } from '@/components/LiveCameraView';
import { useToast } from '@/hooks/use-toast';
import BackButton from '@/components/navigation/BackButton';

const CameraScan = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);

  const handleCapture = async () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "Product Detected",
        description: "Product has been successfully scanned and added to discovered products.",
      });
      navigate('/listings');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-mobile-header border-b border-mobile-border">
        <BackButton />
        
        <h1 className="text-lg font-semibold text-foreground">Scan Product</h1>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-foreground hover:bg-accent"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative">
        <LiveCameraView 
          isOpen={true}
          onClose={() => navigate(-1)}
          onCapture={() => handleCapture()}
          isLoading={isScanning}
        />
        
        {/* Scanning Overlay */}
        {isScanning && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-foreground font-medium">Analyzing product...</p>
              <p className="text-sm text-muted-foreground mt-2">Please wait while we identify the product</p>
            </div>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="p-4 bg-card/50 border-t border-border">
        <div className="text-center">
          <h3 className="font-medium text-foreground mb-2">How to scan</h3>
          <p className="text-sm text-muted-foreground">
            Point your camera at the product and tap the capture button. 
            Make sure the product is well-lit and clearly visible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CameraScan;