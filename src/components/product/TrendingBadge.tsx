import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Flame, Sparkles, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrendingBadgeProps {
  score: number;
  className?: string;
}

const TrendingBadge: React.FC<TrendingBadgeProps> = ({ score, className }) => {
  if (score < 0.5) return null;

  const getTrendingLevel = () => {
    if (score >= 0.8) return 'hot';
    if (score >= 0.7) return 'trending';
    if (score >= 0.5) return 'rising';
    return null;
  };

  const level = getTrendingLevel();
  if (!level) return null;

  const badgeConfig = {
    hot: {
      icon: Flame,
      text: 'Hot',
      className: 'bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse border-0 shadow-[0_0_16px_hsl(var(--neon-orange)/0.6)]'
    },
    trending: {
      icon: TrendingUp,
      text: 'Trending',
      className: 'bg-gradient-to-r from-neon-blue to-neon-purple text-white border-0 shadow-[0_0_12px_hsl(var(--neon-blue)/0.5)]'
    },
    rising: {
      icon: Sparkles,
      text: 'Rising',
      className: 'bg-gradient-to-r from-neon-green to-neon-cyan text-white border-0 shadow-[0_0_8px_hsl(var(--neon-green)/0.4)]'
    }
  };

  const config = badgeConfig[level];
  const IconComponent = config.icon;

  return (
    <Badge className={cn(config.className, className)}>
      <IconComponent className="h-3 w-3 mr-1" />
      {config.text}
    </Badge>
  );
};

export default TrendingBadge;