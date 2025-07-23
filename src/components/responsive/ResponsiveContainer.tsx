
import React from 'react';
import { cn } from '@/lib/utils';
import { spacing } from '@/lib/responsive-utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  size?: keyof typeof spacing.container;
  padding?: keyof typeof spacing.section;
  className?: string;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  size = 'lg',
  padding = 'md',
  className
}) => {
  return (
    <div className={cn(spacing.section[padding], className)}>
      <div className={cn('container mx-auto', spacing.container[size])}>
        {children}
      </div>
    </div>
  );
};

export default ResponsiveContainer;
