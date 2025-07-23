import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GlassMagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  disabled?: boolean;
}

const GlassMagnetic: React.FC<GlassMagneticProps> = ({ 
  children, 
  strength = 0.3, 
  className,
  disabled = false 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (disabled || !ref.current) return;

    const element = ref.current;
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(() => {
        element.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(1.05)`;
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      document.removeEventListener('mousemove', handleMouseMove);
      
      if (element) {
        element.style.transform = 'translate3d(0, 0, 0) scale(1)';
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [strength, disabled]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-transform duration-200 ease-out gpu-accelerated",
        isHovered && "shadow-2xl shadow-neon-blue/30",
        className
      )}
    >
      {children}
    </div>
  );
};

export { GlassMagnetic };