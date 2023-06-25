import { en } from "@faker-js/faker";
import React, { useState } from "react";
import highestPrice from "src/core/products/queries/highestPrice";
import lowestPrice from "src/core/products/queries/lowestPrice";

const PriceRangeSelector = ({ onRangeChange }) => {
  const [minValue, setMinValue] = useState<number>();
  const [maxValue, setMaxValue] = useState<number>();
  const [startPrice, setStartPrice] = useState<number>();
  const [endPrice, setEndPrice] = useState<number>();

  React.useEffect(() => {
    highestPrice()
    .then((product) => {
      if(product){
        setMaxValue(product.price);
        setEndPrice(product.price);
        onRangeChange(minValue, maxValue);
      }
    })
    .catch((error) => {
      console.error('Error retrieving product:', error);
    });

    lowestPrice()
    .then((product) => {
      if(product){
        setMinValue(product.price);
        setStartPrice(product.price);
        onRangeChange(minValue, maxValue);
      }
    })
    .catch((error) => {
      console.error('Error retrieving product:', error);
    });

  }, [minValue, maxValue]);

  const handleStartPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= minValue! && value <= endPrice!) {
      setStartPrice(value);
      onRangeChange(value, endPrice);
    }
  };

  const handleEndPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= startPrice! && value <= maxValue!) {
      setEndPrice(value);
      onRangeChange(startPrice, value);
    }
  };

  return (
    <div>
    <label htmlFor="startPrice">Start Price:</label>
    <input
      type="range"
      id="startPrice"
      min={minValue}
      max={maxValue}
      value={startPrice}
      onChange={handleStartPriceChange}
    />
    <span>{startPrice}</span>

    <label htmlFor="endPrice">End Price:</label>
    <input
      type="range"
      id="endPrice"
      min={minValue}
      max={maxValue}
      value={endPrice}
      onChange={handleEndPriceChange}
    />
    <span>{endPrice}</span>
  </div>
  );
};

export default PriceRangeSelector;
