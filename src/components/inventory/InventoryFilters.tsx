import { Calendar, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { InventoryFilters as IInventoryFilters } from '@/hooks/useInventoryCalculations';

interface InventoryFiltersProps {
  filters: IInventoryFilters;
  setFilters: (filters: IInventoryFilters) => void;
  availableCategories: string[];
  availableStores: string[];
}

export const InventoryFilters = ({ 
  filters, 
  setFilters, 
  availableCategories, 
  availableStores 
}: InventoryFiltersProps) => {
  const handleDateRangeChange = (dateRange: DateRange | undefined) => {
    setFilters({
      ...filters,
      dateRange: dateRange?.from && dateRange?.to 
        ? { start: dateRange.from, end: dateRange.to }
        : null
    });
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    setFilters({
      ...filters,
      categories: newCategories
    });
  };

  const handleStoreChange = (store: string) => {
    const newStores = filters.stores.includes(store)
      ? filters.stores.filter(s => s !== store)
      : [...filters.stores, store];
    
    setFilters({
      ...filters,
      stores: newStores
    });
  };

  const clearAllFilters = () => {
    setFilters({
      dateRange: null,
      categories: [],
      stores: [],
    });
  };

  const getDateRangePreset = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    return { start, end };
  };

  const activeFiltersCount = [
    filters.dateRange ? 1 : 0,
    filters.categories.length,
    filters.stores.length
  ].reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg mb-6">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">Filters</span>
        {activeFiltersCount > 0 && (
          <Badge variant="secondary" className="h-5 px-2 text-xs">
            {activeFiltersCount}
          </Badge>
        )}
      </div>

      {/* Date Range Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-fit justify-start text-left font-normal">
            <Calendar className="mr-2 h-4 w-4" />
            {filters.dateRange ? (
              `${format(filters.dateRange.start, 'MMM dd')} - ${format(filters.dateRange.end, 'MMM dd')}`
            ) : (
              'Date Range'
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 space-y-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters({...filters, dateRange: getDateRangePreset(7)})}
              >
                Last 7 days
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters({...filters, dateRange: getDateRangePreset(30)})}
              >
                Last 30 days
              </Button>
            </div>
            <CalendarComponent
              mode="range"
              selected={{
                from: filters.dateRange?.start,
                to: filters.dateRange?.end
              }}
              onSelect={handleDateRangeChange}
              numberOfMonths={2}
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Category Filter */}
      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {availableCategories.map(category => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Store Filter */}
      <Select onValueChange={handleStoreChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Store" />
        </SelectTrigger>
        <SelectContent>
          {availableStores.map(store => (
            <SelectItem key={store} value={store}>
              {store}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Active Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {filters.categories.map(category => (
          <Badge key={category} variant="secondary" className="gap-1">
            {category}
            <X 
              className="h-3 w-3 cursor-pointer hover:text-destructive" 
              onClick={() => handleCategoryChange(category)}
            />
          </Badge>
        ))}
        
        {filters.stores.map(store => (
          <Badge key={store} variant="secondary" className="gap-1">
            {store}
            <X 
              className="h-3 w-3 cursor-pointer hover:text-destructive" 
              onClick={() => handleStoreChange(store)}
            />
          </Badge>
        ))}
        
        {filters.dateRange && (
          <Badge variant="secondary" className="gap-1">
            {format(filters.dateRange.start, 'MMM dd')} - {format(filters.dateRange.end, 'MMM dd')}
            <X 
              className="h-3 w-3 cursor-pointer hover:text-destructive" 
              onClick={() => setFilters({...filters, dateRange: null})}
            />
          </Badge>
        )}
      </div>

      {/* Clear All Button */}
      {activeFiltersCount > 0 && (
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          Clear All
        </Button>
      )}
    </div>
  );
};