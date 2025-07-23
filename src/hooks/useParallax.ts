import { useEffect, useState } from 'react';

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  offset?: number;
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const { speed = 0.5, direction = 'up', offset = 0 } = options;
  const [transform, setTransform] = useState('translateY(0px)');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxValue = scrolled * speed;
      const translateValue = direction === 'up' ? -parallaxValue : parallaxValue;
      setTransform(`translateY(${translateValue + offset}px)`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, offset]);

  return { transform };
};