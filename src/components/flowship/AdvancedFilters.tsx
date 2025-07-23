import { useState } from 'react';
import { Filter, SlidersHorizontal, Package, DollarSign, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { categories, yemeniRegions } from '@/data/flowshipData';
import { GlassCard } from '@/components/glass/GlassCard';
import { GlassInput, GlassSelect } from '@/components/glass/GlassInput';

interface AdvancedFiltersProps {
  selectedCategory?: string;
  selectedTypes?: string[];
  selectedRegion?: string;
  priceRange: [number, number];
  inStockOnly: boolean;
  sortBy: string;
  onCategoryChange: (category?: string) => void;
  onTypesChange?: (types: string[]) => void;
  onRegionChange?: (region: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onInStockChange: (inStock: boolean) => void;
  onSortChange: (sort: string) => void;
}

const AdvancedFilters = ({
  selectedCategory,
  selectedTypes = [],
  selectedRegion = 'all',
  priceRange,
  inStockOnly,
  sortBy,
  onCategoryChange,
  onTypesChange,
  onRegionChange,
  onPriceRangeChange,
  onInStockChange,
  onSortChange
}: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'products', label: 'Most Products' },
    { value: 'newest', label: 'Newest First' },
  ];

  const typeOptions = [
    { value: 'retailSeller', label: 'Retail Seller' },
    { value: 'shoppingCenter', label: 'Shopping Center' },
    { value: 'commercialMall', label: 'Commercial Mall' },
    { value: 'supermarket', label: 'Supermarket' },
  ];

  const handleTypeToggle = (type: string) => {
    if (!onTypesChange) return;
    
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    onTypesChange(updatedTypes);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-mobile-surface border-mobile-border hover:bg-accent/50"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="bg-background/85 backdrop-blur-lg border border-white/10 shadow-lg rounded-t-2xl max-h-[80vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-foreground">
            <Filter className="h-5 w-5 text-neon-blue" />
            Advanced Filters
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          {/* Region Filter */}
          {onRegionChange && (
            <GlassCard variant="subtle" size="full" className="p-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-neon-green" />
                  Region
                </Label>
                <Select value={selectedRegion} onValueChange={onRegionChange}>
                  <SelectTrigger className="bg-card/30 border-border/30 backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-lg border border-white/10">
                    <SelectItem value="all">All Regions</SelectItem>
                    {yemeniRegions.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.nameEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </GlassCard>
          )}

          {/* Sort By */}
          <GlassCard variant="subtle" size="full" className="p-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4 text-neon-blue" />
                Sort By
              </Label>
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="bg-card/30 border-border/30 backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-lg border border-white/10">
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </GlassCard>

          {/* Type Filter */}
          {onTypesChange && (
            <GlassCard variant="subtle" size="full" className="p-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-neon-purple" />
                  Supplier Type
                </Label>
                <div className="space-y-3">
                  {typeOptions.map((type) => (
                    <div key={type.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.value}
                        checked={selectedTypes.includes(type.value)}
                        onCheckedChange={() => handleTypeToggle(type.value)}
                        className="border-border/40 data-[state=checked]:bg-neon-purple data-[state=checked]:border-neon-purple"
                      />
                      <Label
                        htmlFor={type.value}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          )}

          {/* Category Filter */}
          <GlassCard variant="subtle" size="full" className="p-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Product Category</Label>
              <Select value={selectedCategory || 'all'} onValueChange={(value) => onCategoryChange(value === 'all' ? undefined : value)}>
                <SelectTrigger className="bg-card/30 border-border/30 backdrop-blur-sm">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-lg border border-white/10">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </GlassCard>

          {/* Price Range */}
          <GlassCard variant="subtle" size="full" className="p-4">
            <div className="space-y-4">
              <Label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-neon-green" />
                Price Range
              </Label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={(value) => onPriceRangeChange(value as [number, number])}
                  max={1000}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* In Stock Only */}
          <GlassCard variant="subtle" size="full" className="p-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">In Stock Only</Label>
              <Switch
                checked={inStockOnly}
                onCheckedChange={onInStockChange}
                className="data-[state=checked]:bg-neon-blue"
              />
            </div>
          </GlassCard>
        </div>

        <div className="flex gap-3 pt-4 border-t border-white/10">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1 bg-card/30 border-border/30 backdrop-blur-sm hover:bg-card/40"
          >
            Apply Filters
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              onCategoryChange(undefined);
              onTypesChange?.([]);
              onRegionChange?.('all');
              onPriceRangeChange([0, 1000]);
              onInStockChange(false);
              onSortChange('relevance');
            }}
            className="flex-1 hover:bg-card/20"
          >
            Reset
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdvancedFilters;