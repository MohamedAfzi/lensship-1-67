import React from 'react';
import { cn } from '@/lib/utils';
import { GlassLayer } from './GlassLayer';

interface GlassStackProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'tight' | 'normal' | 'loose';
  cascade?: boolean;
}

const GlassStack: React.FC<GlassStackProps> = ({ 
  children, 
  className, 
  spacing = 'normal',
  cascade = false 
}) => {
  const spacingClasses = {
    tight: 'gap-2',
    normal: 'gap-4',
    loose: 'gap-8'
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div 
      className={cn(
        "relative flex flex-col",
        spacingClasses[spacing],
        cascade && "glass-stack",
        className
      )}
      style={{ perspective: '1000px' }}
    >
      {childrenArray.map((child, index) => (
        <GlassLayer
          key={index}
          depth={Math.min(5, index + 1) as 1 | 2 | 3 | 4 | 5}
          interaction="magnetic"
          className={cn(
            cascade && "hover:translate-z-4",
            cascade && index > 0 && "-mt-8"
          )}
          style={{
            animationDelay: cascade ? `${index * 100}ms` : '0ms',
            transform: cascade ? `rotateX(${index * 2}deg) translateZ(${index * 4}px)` : undefined
          }}
        >
          {child}
        </GlassLayer>
      ))}
    </div>
  );
};

export { GlassStack };