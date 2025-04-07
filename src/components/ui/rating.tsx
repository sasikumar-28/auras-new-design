import React from "react";
import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  rating: number;
  reviewCount: number;
}

const Rating: React.FC<RatingProps> = ({ rating, reviewCount }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2 text-yellow-500">
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={20} fill="currentColor" stroke="none" />
        ))}
        {hasHalfStar && <StarHalf size={20} />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`full-${i}`} size={20} fill="none" strokeWidth={1}/>
        ))}
      </div>
      <span className="text-gray-700 text-sm">({reviewCount} reviews)</span>
      <a
        href="#write-review"
        className="text-sm text-gray-600 underline ml-2 hover:text-blue-800"
      >
        Write a review
      </a>
    </div>
  );
};

export default Rating;
