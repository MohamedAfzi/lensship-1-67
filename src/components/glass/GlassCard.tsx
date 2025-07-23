
import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const glassCardVariants = cva(
  "backdrop-blur-md border border-border/20 rounded-xl transition-all duration-300 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-card/30 hover:bg-card/40",
        intense: "bg-card/50 hover:bg-card/60",
        subtle: "bg-card/20 hover:bg-card/30",
        glow: "bg-card/30 hover:bg-card/40 hover:shadow-glow-blue hover:border-neon-blue/40",
      },
      size: {
        small: "w-full max-w-xs h-auto p-3 sm:p-4",
        medium: "w-full max-w-sm sm:max-w-md h-auto p-4 sm:p-6",
        large: "w-full h-auto p-6 sm:p-8",
        full: "w-full h-full p-4 sm:p-6",
      },
      blur: {
        light: "backdrop-blur-sm",
        medium: "backdrop-blur-md", 
        intense: "backdrop-blur-lg",
        extreme: "backdrop-blur-xl",
      },
      hover: {
        none: "",
        scale: "hover:scale-105 active:scale-95",
        glow: "hover:shadow-[var(--glow-blue)] hover:border-neon-blue/60",
        pulse: "hover:animate-glass-pulse",
        float: "hover:animate-glass-float",
      },
      responsive: {
        true: "transform-gpu will-change-transform",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "medium",
      blur: "medium",
      hover: "scale",
      responsive: true,
    },
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
  children: React.ReactNode;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant, size, blur, hover, responsive, children, ...props }, ref) => {
    return (
      <div
        className={cn(glassCardVariants({ variant, size, blur, hover, responsive, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassCard.displayName = "GlassCard";

// Responsive preset variants
export const GlassCardSmall = React.forwardRef<HTMLDivElement, Omit<GlassCardProps, 'size'>>(
  ({ className, ...props }, ref) => (
    <GlassCard ref={ref} size="small" className={className} {...props} />
  )
);
GlassCardSmall.displayName = "GlassCardSmall";

export const GlassCardMedium = React.forwardRef<HTMLDivElement, Omit<GlassCardProps, 'size'>>(
  ({ className, ...props }, ref) => (
    <GlassCard ref={ref} size="medium" className={className} {...props} />
  )
);
GlassCardMedium.displayName = "GlassCardMedium";

export const GlassCardFull = React.forwardRef<HTMLDivElement, Omit<GlassCardProps, 'size'>>(
  ({ className, ...props }, ref) => (
    <GlassCard ref={ref} size="full" className={className} {...props} />
  )
);
GlassCardFull.displayName = "GlassCardFull";

export { GlassCard, glassCardVariants };
