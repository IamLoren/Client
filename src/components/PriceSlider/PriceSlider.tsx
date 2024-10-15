import React, { useState } from "react";
import { useAppSelector } from "../../hooks";
import { selectAllCars, selectRole, selectUserListOfCars } from "../../redux/selectors";


interface RangeChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { valueAsNumber: number };
  }

const PriceRangeSlider: React.FC = () => {
    const cars = useAppSelector(selectAllCars);
    const role = useAppSelector(selectRole);
    const carsUserList = useAppSelector(selectUserListOfCars);
    const listOfCars = role === "admin" ? cars : carsUserList;
    
    const prices = listOfCars.length > 0 ? listOfCars.map(car => car.price.day) : [];
   const min = Math.min(...prices);
   const max = Math.max(...prices)
    const [minPrice, setMinPrice] = useState(min);
    const [maxPrice, setMaxPrice] = useState(max);

  const handleMinChange = (event: RangeChangeEvent) => {
    const value = event.target.value;
    setMinPrice(Number(value));

  };

  const handleMaxChange = (event: RangeChangeEvent) => {
    const value = event.target.value
    setMaxPrice(Number(value));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full">
        <span>Min Price: ${minPrice}</span>
        <span>Max Price: ${maxPrice}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={minPrice}
        onChange={handleMinChange}
        className="my-4"
      />
      <input
        type="range"
        min={minPrice}
        max={max}
        value={maxPrice}
        onChange={handleMaxChange}
        className="my-4"
      />
    </div>
  );
};

export default PriceRangeSlider;