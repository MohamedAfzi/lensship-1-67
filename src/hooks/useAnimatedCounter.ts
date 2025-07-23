import { useState, useEffect } from 'react';

interface UseAnimatedCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  isActive?: boolean;
}

export const useAnimatedCounter = ({ 
  start = 0, 
  end, 
  duration = 2000, 
  isActive = true 
}: UseAnimatedCounterOptions) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isActive) return;

    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(start + (end - start) * easeOutCubic));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [start, end, duration, isActive]);

  return count;
};