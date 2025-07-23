import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const glassInputVariants = cva(
  "backdrop-blur-md border rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-card/30 border-border/30 hover:bg-card/40 focus:bg-card/50",
        neumorphic: "bg-card/40 border-border/20 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.6),inset_-2px_-2px_6px_rgba(255,255,255,0.1)]",
        glow: "bg-card/30 border-neon-blue/20 hover:border-neon-blue/40 focus:border-neon-blue/60 focus:shadow-glow-blue",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface GlassInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof glassInputVariants> {}

const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <input
        className={cn(
          glassInputVariants({ variant, size }),
          "text-foreground placeholder:text-muted-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
GlassInput.displayName = "GlassInput";

export interface GlassSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof glassInputVariants> {}

const GlassSelect = React.forwardRef<HTMLSelectElement, GlassSelectProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          glassInputVariants({ variant, size }),
          "text-foreground bg-transparent cursor-pointer",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);
GlassSelect.displayName = "GlassSelect";

export interface GlassToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const GlassToggle = React.forwardRef<HTMLButtonElement, GlassToggleProps>(
  ({ checked = false, onChange, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200",
          "backdrop-blur-md border border-border/30",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue/80 focus-visible:ring-offset-2",
          checked
            ? "bg-neon-blue/30 border-neon-blue/60 shadow-glow-blue"
            : "bg-card/30 border-border/30 hover:bg-card/40",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 rounded-full transition-transform duration-200",
            "backdrop-blur-sm border border-border/40",
            checked
              ? "translate-x-6 bg-neon-blue border-neon-blue/80"
              : "translate-x-1 bg-muted border-muted-foreground/40"
          )}
        />
      </button>
    );
  }
);
GlassToggle.displayName = "GlassToggle";

export { GlassInput, GlassSelect, GlassToggle, glassInputVariants };