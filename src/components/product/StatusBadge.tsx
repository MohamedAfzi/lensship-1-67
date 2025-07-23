import { Badge } from '@/components/ui/badge';
import { ProductStatus } from '@/types/product';

interface StatusBadgeProps {
  status: ProductStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusConfig = (status: ProductStatus) => {
    switch (status) {
      case 'draft':
        return {
          label: 'Draft',
          className: 'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20',
        };
      case 'published':
        return {
          label: 'Published',
          className: 'bg-neon-green/10 text-neon-green border-neon-green/20 hover:bg-neon-green/20',
        };
      case 'out_of_stock':
        return {
          label: 'Out of Stock',
          className: 'bg-muted/10 text-muted-foreground border-muted/20 hover:bg-muted/20',
        };
      default:
        return {
          label: 'Unknown',
          className: 'bg-muted/10 text-muted-foreground border-muted/20',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};