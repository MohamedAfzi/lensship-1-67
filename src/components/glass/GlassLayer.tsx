import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const glassLayerVariants = cva(
  "relative transition-all duration-500 gpu-accelerated",
  {
    variants: {
      depth: {
        1: "z-10 backdrop-blur-sm bg-card/20",
        2: "z-20 backdrop-blur-md bg-card/25 translate-z-4",
        3: "z-30 backdrop-blur-lg bg-card/30 translate-z-8",
        4: "z-40 backdrop-blur-xl bg-card/35 translate-z-12",
        5: "z-50 backdrop-blur-2xl bg-card/40 translate-z-16",
      },
      interaction: {
        static: "",
        hover: "hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-neon-blue/20",
        magnetic: "hover:scale-105 hover:rotate-1 hover:shadow-[0_20px_40px_hsl(var(--neon-blue)/0.3)]",
        float: "animate-glass-float hover:animate-none hover:translate-y-[-8px]",
      },
      perspective: {
        none: "",
        light: "transform-style-preserve-3d perspective-1000",
        medium: "transform-style-preserve-3d perspective-800",
        strong: "transform-style-preserve-3d perspective-600",
      }
    },
    defaultVariants: {
      depth: 2,
      interaction: "hover",
      perspective: "light",
    },
  }
);

export interface GlassLayerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassLayerVariants> {
  children: React.ReactNode;
}

const GlassLayer = React.forwardRef<HTMLDivElement, GlassLayerProps>(
  ({ className, depth, interaction, perspective, children, ...props }, ref) => {
    return (
      <div
        className={cn(glassLayerVariants({ depth, interaction, perspective, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
GlassLayer.displayName = "GlassLayer";

export { GlassLayer, glassLayerVariants };