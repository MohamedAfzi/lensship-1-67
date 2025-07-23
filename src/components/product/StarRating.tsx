import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  showCount?: boolean;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  showCount = true,
  reviewCount,
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < maxRating; i++) {
      if (i < fullStars) {
        // Full star
        stars.push(
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              "fill-yellow-400 text-yellow-400"
            )}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        // Half star
        stars.push(
          <div key={i} className="relative">
            <Star
              className={cn(
                sizeClasses[size],
                "text-muted-foreground"
              )}
            />
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${(rating % 1) * 100}%` }}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  "fill-yellow-400 text-yellow-400"
                )}
              />
            </div>
          </div>
        );
      } else {
        // Empty star
        stars.push(
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              "text-muted-foreground"
            )}
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1">
        {renderStars()}
      </div>
      
      <div className={cn("flex items-center gap-1", textSizeClasses[size])}>
        <span className="font-semibold text-foreground">
          {rating.toFixed(1)}
        </span>
        {showCount && reviewCount !== undefined && (
          <span className="text-muted-foreground">
            ({reviewCount.toLocaleString()})
          </span>
        )}
      </div>
    </div>
  );
};

export default StarRating;