import { useState } from 'react';
import { Check, ChevronDown, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { yemeniRegions } from '@/data/flowshipData';
import type { Region } from '@/types/flowship';

interface RegionFilterProps {
  selectedRegion: string;
  onRegionChange: (regionId: string) => void;
}

const RegionFilter = ({ selectedRegion, onRegionChange }: RegionFilterProps) => {
  const [open, setOpen] = useState(false);

  const selectedRegionData = yemeniRegions.find(region => region.id === selectedRegion);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between bg-mobile-surface border-mobile-border hover:bg-accent"
        >
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-neon-blue" />
            <span className="text-sm">
              {selectedRegionData?.nameEn || 'Select Region'}
            </span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-mobile-surface border-mobile-border" align="start">
        <div className="max-h-60 overflow-auto">
          {yemeniRegions.map((region) => (
            <button
              key={region.id}
              onClick={() => {
                onRegionChange(region.id);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-accent transition-colors",
                selectedRegion === region.id && "bg-accent text-neon-blue"
              )}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{region.nameEn}</span>
                <span className="text-xs text-muted-foreground">{region.nameAr}</span>
              </div>
              {selectedRegion === region.id && (
                <Check className="h-4 w-4 text-neon-blue" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RegionFilter;