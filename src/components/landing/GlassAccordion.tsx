import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/glass';

interface AccordionItem {
  question: string;
  answer: string;
  category?: string;
}

interface GlassAccordionProps {
  items: AccordionItem[];
  searchTerm?: string;
  className?: string;
}

const GlassAccordion: React.FC<GlassAccordionProps> = ({ 
  items, 
  searchTerm = '', 
  className 
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const filteredItems = items.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightText = (text: string, term: string) => {
    if (!term) return text;
    
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-neon-blue/20 text-neon-blue rounded px-1">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      {filteredItems.map((item, index) => {
        const isOpen = openItems.has(index);
        const originalIndex = items.indexOf(item);
        
        return (
          <GlassCard
            key={originalIndex}
            variant={isOpen ? "glow" : "default"}
            hover="glow"
            className={cn(
              "group overflow-hidden transition-all duration-500 gpu-accelerated",
              "animate-glass-entrance focus-ring",
              isOpen && "glass-layer-3 shadow-2xl shadow-neon-blue/20 scale-[1.02]"
            )}
            style={{ 
              animationDelay: `${index * 100}ms`,
              transformOrigin: 'center',
            }}
          >
            <button
              onClick={() => toggleItem(originalIndex)}
              className={cn(
                "w-full p-6 text-left flex items-center justify-between",
                "transition-all duration-300 hover:bg-card/40 rounded-xl",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/80",
                isOpen && "bg-card/30"
              )}
            >
              <span className="font-semibold text-lg pr-4 leading-relaxed">
                {highlightText(item.question, searchTerm)}
              </span>
              
              <div className="flex-shrink-0 relative">
                <div className={cn(
                  "transition-all duration-300 absolute inset-0 flex items-center justify-center",
                  isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                )}>
                  <Plus className="w-5 h-5 text-neon-blue" />
                </div>
                <div className={cn(
                  "transition-all duration-300 flex items-center justify-center",
                  isOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
                )}>
                  <Minus className="w-5 h-5 text-neon-blue" />
                </div>
              </div>
            </button>

            <div className={cn(
              "overflow-hidden transition-all duration-500 ease-out",
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}>
              <div className={cn(
                "px-6 pb-6 transform transition-transform duration-300",
                isOpen ? "translate-y-0" : "-translate-y-4"
              )}>
                <div className="border-t border-border/20 pt-4">
                  <p className="text-foreground/80 leading-relaxed text-base">
                    {highlightText(item.answer, searchTerm)}
                  </p>
                </div>
              </div>
            </div>

            {/* Active glow effect */}
            {isOpen && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-transparent to-neon-blue/5 animate-glass-pulse" />
              </div>
            )}
          </GlassCard>
        );
      })}
      
      {filteredItems.length === 0 && searchTerm && (
        <GlassCard className="p-8 text-center opacity-50">
          <p className="text-foreground/60">
            No questions found matching "{searchTerm}"
          </p>
        </GlassCard>
      )}
    </div>
  );
};

export default GlassAccordion;