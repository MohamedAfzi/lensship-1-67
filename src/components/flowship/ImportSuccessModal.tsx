import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ImportSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewInventory: () => void;
  importedCount: number;
  productNames: string[];
}

const ImportSuccessModal = ({ 
  isOpen, 
  onClose, 
  onViewInventory, 
  importedCount,
  productNames 
}: ImportSuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-mobile-surface border-mobile-border">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-neon-green/10 rounded-full flex items-center justify-center animate-scale-in">
              <CheckCircle className="h-8 w-8 text-neon-green" />
            </div>
          </div>
          <DialogTitle className="text-center text-foreground">
            Import Successful!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-muted-foreground">
              Successfully imported {importedCount} product{importedCount > 1 ? 's' : ''} to your inventory
            </p>
          </div>

          {/* Product List */}
          <div className="bg-accent/30 rounded-lg p-3 max-h-32 overflow-y-auto">
            {productNames.slice(0, 3).map((name, index) => (
              <div key={index} className="flex items-center gap-2 py-1">
                <Package className="h-4 w-4 text-neon-blue" />
                <span className="text-sm text-foreground">{name}</span>
              </div>
            ))}
            {productNames.length > 3 && (
              <p className="text-xs text-muted-foreground mt-2">
                +{productNames.length - 3} more products
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-mobile-border hover:bg-accent"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={onViewInventory}
              className="flex-1 bg-neon-blue hover:bg-neon-blue/90 text-background"
            >
              View Inventory
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportSuccessModal;