import { useState } from 'react';
import { Search, Grid, List, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductFilters, ViewMode } from '@/types/product';

interface FilterBarProps {
  filters: ProductFilters;
  viewMode: ViewMode;
  onFiltersChange: (filters: Partial<ProductFilters>) => void;
  onViewModeChange: (mode: ViewMode) => void;
  showStockSort?: boolean;
}

export const FilterBar = ({ 
  filters, 
  viewMode, 
  onFiltersChange, 
  onViewModeChange,
  showStockSort = false 
}: FilterBarProps) => {
  const [searchInput, setSearchInput] = useState(filters.search);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    onFiltersChange({ search: value });
  };

  const sortOptions = [
    { value: 'date_desc', label: 'Newest First' },
    { value: 'date_asc', label: 'Oldest First' },
    ...(showStockSort ? [
      { value: 'stock_desc', label: 'Highest Stock' },
      { value: 'stock_asc', label: 'Lowest Stock' },
    ] : []),
  ];

  const categories = [
    'Electronics',
    'Accessories',
    'Wearables',
    'Home & Garden',
    'Clothing',
  ];

  return (
    <div className="space-y-4 p-4 bg-card/50 rounded-lg border border-border/50">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products by name or ID..."
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 h-10 bg-background/50 border-border/50 focus:border-primary/50"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Sort Selector */}
        <Select value={filters.sortBy} onValueChange={(value: any) => onFiltersChange({ sortBy: value })}>
          <SelectTrigger className="w-[180px] h-9 bg-background/50 border-border/50">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={filters.category || 'all'} onValueChange={(value) => onFiltersChange({ category: value === 'all' ? undefined : value })}>
          <SelectTrigger className="w-[150px] h-9 bg-background/50 border-border/50">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Spacer */}
        <div className="flex-1" />

        {/* View Mode Toggle */}
        <div className="flex rounded-md border border-border/50 overflow-hidden">
          <Button
            size="sm"
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            onClick={() => onViewModeChange('grid')}
            className="h-9 px-3 rounded-none border-0"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            onClick={() => onViewModeChange('list')}
            className="h-9 px-3 rounded-none border-0 border-l border-border/50"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};