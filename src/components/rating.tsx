import { useState } from "react";

const Rating = ({ totalStars = 5, onRate }: any) => {
  const [rating, setRating] = useState(5);

  const handleClick = (index: number) => {
    setRating(index + 1);
    if (onRate) onRate(index + 1);
  };

  return (
    <div className="flex space-x-1">
      {Array.from({ length: totalStars }, (_, i) => (
        <svg
          key={i}
          onClick={() => handleClick(i)}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.122-6.545L1 6.364l6.561-.955L10 0l2.439 5.409 6.561.955-4.244 5.182 1.122 6.545z" />
        </svg>
      ))}
    </div>
  );
};

export default Rating;
