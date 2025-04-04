import React, { useState } from "react";
import { Slider, TextField, Button } from "@mui/material";
import { Icon } from "@iconify/react";

type PriceFacetProps = {
  onFilterChange: (min: number, max: number) => void;
  themeColor: string;
  loading: boolean;
};

const PriceFacet: React.FC<PriceFacetProps> = ({
  themeColor,
  onFilterChange,
  loading,
}) => {
  const minPrice = 1;
  const maxPrice = 400;

  // State for the slider and text input fields
  const [sliderRange, setSliderRange] = useState([minPrice, maxPrice]);
  const [inputRange, setInputRange] = useState([minPrice, maxPrice]);
  const [isOpen, setIsOpen] = useState(true);

  // Handle slider change
  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    if (loading) return;
    if (Array.isArray(newValue)) {
      setSliderRange(newValue);
    }
  };

  // Apply slider values when released
  const handleSliderCommit = (_: Event, newValue: number | number[]) => {
    if (loading) return;
    if (Array.isArray(newValue)) {
      setSliderRange(newValue);
      onFilterChange(newValue[0], newValue[1]);
    }
  };

  // Handle independent text field changes
  const handleInputChange = (index: number, value: string) => {
    const numValue = Number(value);
    if (isNaN(numValue) || value === "") return;

    const newInputRange = [...inputRange];
    newInputRange[index] = numValue;
    setInputRange(newInputRange);
  };

  // Apply the values from text fields when clicking "Go"
  const handleGoClick = () => {
    if (!loading) {
      onFilterChange(inputRange[0], inputRange[1]);
    }
  };

  return (
    <div className="p-3 border-b border-gray-200 rounded-lg w-full max-w-md mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full font-semibold text-left"
        disabled={loading}
      >
        Price
        <Icon
          icon={isOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
          className={`text-gray-600 text-lg ${loading ? "opacity-50" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="ml-5 mt-2">
          <p className={`mb-1 text-sm ${loading ? "opacity-50" : ""}`}>
            ${sliderRange[0]} - ${sliderRange[1]}
          </p>
          <Slider
            value={sliderRange}
            onChange={handleSliderChange}
            onChangeCommitted={handleSliderCommit}
            min={minPrice}
            max={maxPrice}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
            disabled={loading}
            sx={{
              "& .MuiSlider-thumb": {
                width: 10,
                height: 10,
                backgroundColor: themeColor,
                opacity: loading ? 0.5 : 1,
                pointerEvents: loading ? "none" : "auto",
              },
              "& .MuiSlider-track": {
                backgroundColor: themeColor,
                opacity: loading ? 0.5 : 1,
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#d1d5db",
                opacity: 1,
              },
            }}
          />

          {/* Independent Text Inputs + Go Button */}
          <div className="flex items-center gap-2 mt-2 justify-center">
            <TextField
              type="number"
              value={inputRange[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
              disabled={loading}
              size="small"
              inputProps={{
                className: "text-center text-xs no-arrows",
                style: {
                  padding: "2px 5px",
                  height: "24px",
                  width: "60px",
                  fontSize: "12px",
                },
              }}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
            />
            <span className="text-xs">to</span>
            <TextField
              type="number"
              value={inputRange[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
              disabled={loading}
              size="small"
              inputProps={{
                className: "text-center text-xs no-arrows",
                style: {
                  padding: "2px 5px",
                  height: "24px",
                  width: "60px",
                  fontSize: "12px",
                },
              }}
              sx={{
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              }}
            />
            <Button
              onClick={handleGoClick}
              variant="contained"
              size="small"
              sx={{
                backgroundColor: themeColor,
                textTransform: "none",
                minWidth: "40px",
                padding: "2px 8px",
                fontSize: "0.7rem",
                height: "26px",
                "&:hover": { backgroundColor: themeColor },
                "&:disabled": { backgroundColor: "#ccc" },
              }}
              disabled={loading}
            >
              Go
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFacet;
