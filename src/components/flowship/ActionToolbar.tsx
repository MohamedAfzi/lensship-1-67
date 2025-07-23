import { ShoppingCart, Package, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ActionToolbarProps {
  selectedCount: number;
  onBulkImport: () => void;
  onViewSelected: () => void;
  onClearSelection: () => void;
  isVisible: boolean;
}

const ActionToolbar = ({ 
  selectedCount, 
  onBulkImport, 
  onViewSelected, 
  onClearSelection,
  isVisible 
}: ActionToolbarProps) => {
  if (!isVisible || selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-in-up">
      <div className="bg-mobile-surface/95 backdrop-blur-sm border border-mobile-border rounded-lg p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge className="bg-neon-blue text-background">
              {selectedCount} selected
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onViewSelected}
              className="border-mobile-border hover:bg-accent"
            >
              <Package className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button
              size="sm"
              onClick={onBulkImport}
              className="bg-neon-blue hover:bg-neon-blue/90 text-background"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Import All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionToolbar;