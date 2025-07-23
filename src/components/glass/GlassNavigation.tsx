import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlassNavigationProps {
  children: React.ReactNode;
  className?: string;
}

const GlassNavigation: React.FC<GlassNavigationProps> = ({ children, className }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "backdrop-blur-md bg-background/80 border-b border-border/20 shadow-lg"
          : "backdrop-blur-sm bg-background/60",
        className
      )}
    >
      {children}
    </nav>
  );
};

export default GlassNavigation;