
import React from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/responsive-utils';

interface ResponsiveTextProps {
  children: React.ReactNode;
  variant: 'hero' | 'heading' | 'subheading' | 'body';
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant,
  className,
  style,
  as: Component = 'p'
}) => {
  const responsiveClasses = Object.entries(typography[variant])
    .map(([breakpoint, size]) => 
      breakpoint === 'xs' ? size : `${breakpoint}:${size}`
    )
    .join(' ');

  return (
    <Component className={cn(responsiveClasses, className)} style={style}>
      {children}
    </Component>
  );
};

export default ResponsiveText;
