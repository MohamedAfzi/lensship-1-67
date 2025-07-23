import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { yemeniRegions } from '@/data/flowshipData';

interface FilterChipsProps {
  selectedRegion: string;
  selectedCategory?: string;
  selectedTypes?: string[];
  onRegionChange: (region: string) => void;
  onCategoryChange: (category?: string) => void;
  onTypesChange?: (types: string[]) => void;
  onClearAll: () => void;
}

const FilterChips = ({
  selectedRegion,
  selectedCategory,
  selectedTypes = [],
  onRegionChange,
  onCategoryChange,
  onTypesChange,
  onClearAll
}: FilterChipsProps) => {
  const hasActiveFilters = selectedRegion !== 'all' || selectedCategory || selectedTypes.length > 0;
  const regionName = yemeniRegions.find(r => r.id === selectedRegion)?.nameEn || 'All Regions';
  
  const typeLabels: Record<string, string> = {
    retailSeller: 'Retail Seller',
    shoppingCenter: 'Shopping Center',
    commercialMall: 'Commercial Mall',
    supermarket: 'Supermarket'
  };

  const removeType = (typeToRemove: string) => {
    if (onTypesChange) {
      onTypesChange(selectedTypes.filter(type => type !== typeToRemove));
    }
  };

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-mobile-surface/50 rounded-lg border border-mobile-border/50">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      
      {selectedRegion !== 'all' && (
        <Badge variant="secondary" className="gap-1 bg-neon-blue/10 text-neon-blue border-neon-blue/20">
          Region: {regionName}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRegionChange('all')}
            className="h-auto p-0 w-4 h-4 hover:bg-transparent"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {selectedCategory && (
        <Badge variant="secondary" className="gap-1 bg-neon-green/10 text-neon-green border-neon-green/20">
          Category: {selectedCategory}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange(undefined)}
            className="h-auto p-0 w-4 h-4 hover:bg-transparent"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {selectedTypes.map((type) => (
        <Badge key={type} variant="secondary" className="gap-1 bg-neon-purple/10 text-neon-purple border-neon-purple/20">
          Type: {typeLabels[type]}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeType(type)}
            className="h-auto p-0 w-4 h-4 hover:bg-transparent"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-xs text-muted-foreground hover:text-foreground"
      >
        Clear all
      </Button>
    </div>
  );
};

export default FilterChips;