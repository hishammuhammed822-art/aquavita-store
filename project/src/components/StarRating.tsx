import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ rating, reviewCount, size = 'sm' }: StarRatingProps) {
  const starSize = size === 'lg' ? 'h-5 w-5' : size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5';
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => {
          const isFull = i < fullStars;
          const isHalf = i === fullStars && hasHalf;
          return (
            <div key={i} className="relative">
              <Star className={`${starSize} text-gold/30`} fill="currentColor" />
              {(isFull || isHalf) && (
                <div className={`absolute inset-0 overflow-hidden ${isHalf ? 'w-1/2' : 'w-full'}`}>
                  <Star className={`${starSize} text-gold`} fill="currentColor" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <span className="text-xs font-medium text-muted">
        {rating.toFixed(1)}
        {reviewCount != null && reviewCount > 0 && ` (${reviewCount})`}
      </span>
    </div>
  );
}
