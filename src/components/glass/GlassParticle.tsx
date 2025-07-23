import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocity: { x: number; y: number };
  color: string;
}

interface GlassParticleSystemProps {
  count?: number;
  className?: string;
  interactive?: boolean;
}

const GlassParticleSystem: React.FC<GlassParticleSystemProps> = ({ 
  count = 12, 
  className,
  interactive = true 
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const colors = [
      'hsl(var(--neon-blue) / 0.3)',
      'hsl(var(--neon-pink) / 0.2)',
      'hsl(var(--neon-cyan) / 0.25)',
      'hsl(var(--neon-purple) / 0.2)',
    ];

    const initialParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      opacity: Math.random() * 0.7 + 0.3,
      velocity: {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
      },
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles(initialParticles);
  }, [count]);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      setMousePos({
        x: (e.clientX / rect.width) * 100,
        y: (e.clientY / rect.height) * 100,
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  useEffect(() => {
    if (!interactive) return;

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => {
        const distanceToMouse = Math.sqrt(
          Math.pow(particle.x - mousePos.x, 2) + Math.pow(particle.y - mousePos.y, 2)
        );
        
        const magneticForce = Math.max(0, (20 - distanceToMouse) * 0.001);
        const directionX = mousePos.x - particle.x;
        const directionY = mousePos.y - particle.y;
        
        return {
          ...particle,
          x: (particle.x + particle.velocity.x + directionX * magneticForce) % 100,
          y: (particle.y + particle.velocity.y + directionY * magneticForce) % 100,
        };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [mousePos, interactive]);

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full backdrop-blur-sm animate-parallax-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            animationDelay: `${particle.id * 0.2}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            filter: 'blur(0.5px)',
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
};

export { GlassParticleSystem };