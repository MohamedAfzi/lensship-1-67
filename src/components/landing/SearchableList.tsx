import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/glass';

interface SearchableListProps {
  onSearchChange: (term: string) => void;
  placeholder?: string;
  className?: string;
  resultsCount?: number;
  totalCount?: number;
}

const SearchableList: React.FC<SearchableListProps> = ({ 
  onSearchChange,
  placeholder = "Search questions...",
  className,
  resultsCount,
  totalCount
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearchChange('');
  };

  return (
    <GlassCard 
      variant="subtle" 
      className={cn("p-4 mb-8 animate-glass-entrance", className)}
    >
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-5 h-5 text-neon-blue/60 pointer-events-none" />
          
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "w-full pl-10 pr-10 py-3 bg-transparent",
              "text-foreground placeholder-foreground/50",
              "border border-border/30 rounded-lg",
              "focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue/50",
              "transition-all duration-300 backdrop-blur-sm"
            )}
          />
          
          {searchTerm && (
            <button
              onClick={clearSearch}
              className={cn(
                "absolute right-3 p-1 rounded-full",
                "text-foreground/50 hover:text-foreground hover:bg-card/30",
                "transition-all duration-200"
              )}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {searchTerm && typeof resultsCount === 'number' && typeof totalCount === 'number' && (
          <div className="mt-3 flex items-center justify-between text-sm text-foreground/60">
            <span>
              Showing {resultsCount} of {totalCount} questions
            </span>
            {resultsCount === 0 && (
              <span className="text-orange-400">
                Try different keywords
              </span>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default SearchableList;