import { useState } from "react";
import { Icon } from "@iconify/react";

interface RatingOption {
  label: string;
  value: number;
}

interface RatingFacetProps {
  onFilterChange: (selectedRating: number) => void;
  themeColor: string;
  loading: boolean;
}

const ratingOptions: RatingOption[] = [
  { label: "2.0 & Above", value: 2 },
  { label: "3.0 & Above", value: 3 },
  { label: "3.5 & Above", value: 3.5 },
  { label: "4.0 & Above", value: 4 },
];

const RatingFacet: React.FC<RatingFacetProps> = ({
  themeColor,
  onFilterChange,
  loading,
}) => {
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (value: number) => {
    if (loading) return; // Prevent changes when loading

    const updatedRatings = selectedRatings.includes(value)
      ? selectedRatings.filter((rating) => rating !== value)
      : [...selectedRatings, value];

    setSelectedRatings(updatedRatings);

    // If no rating is selected, send 0 to the parent; otherwise, send the highest selected rating
    onFilterChange(updatedRatings.length > 0 ? Math.max(...updatedRatings) : 0);
  };

  return (
    <div className="p-4 border-b border-gray-200 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full font-semibold text-left"
        disabled={loading}
      >
        Ratings
        <Icon
          icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
          className={`text-gray-600 text-lg ${loading ? "opacity-50" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="mt-2">
          {ratingOptions.map((option) => (
            <label
              key={option.value}
              className={`text-sm flex items-center gap-2 mb-2 ml-5 cursor-pointer ${
                selectedRatings.includes(option.value) ? "font-semibold" : "text-gray-700"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              style={{
                color: selectedRatings.includes(option.value) ? themeColor : undefined,
              }}
            >
              <input
                type="checkbox"
                value={option.value}
                checked={selectedRatings.includes(option.value)}
                onChange={() => handleChange(option.value)}
                disabled={loading}
                className="w-4 h-4 cursor-pointer"
                style={{
                  accentColor: themeColor,
                  pointerEvents: loading ? "none" : "auto",
                }}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatingFacet;
