import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectAllCars,
  selectMaxPrice,
  selectMinPrice,
  selectRole,
  selectUserListOfCars,
} from "../../redux/selectors";
import { changeMaxPrice, changeMinPrice } from "../../redux/carRentalSlice/carRentalSlice";

interface RangeChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & { valueAsNumber: number };
}

const PriceRangeSlider: React.FC = () => {
  const dispatch = useAppDispatch()
  const cars = useAppSelector(selectAllCars);
  const role = useAppSelector(selectRole);
  const carsUserList = useAppSelector(selectUserListOfCars);
  const listOfCars = role === "admin" ? cars : carsUserList;
  const selectedMinPrice = useAppSelector(selectMinPrice);
  const selectedMaxPrice = useAppSelector(selectMaxPrice);

  const prices =
    listOfCars.length > 0 ? listOfCars.map((car) => car.price.day) : [];
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const [minPrice, setMinPrice] = useState(selectedMinPrice);
  const [maxPrice, setMaxPrice] = useState(selectedMaxPrice);

  useEffect(()=> {
    setMinPrice(selectedMinPrice);
    setMaxPrice(selectedMaxPrice);
  },[selectedMaxPrice, selectedMinPrice])

  const handleMinChange = (event: RangeChangeEvent) => {
    const value = event.target.value;
    setMinPrice(Number(value));
    dispatch(changeMinPrice(Number(value)))
  };

  const handleMaxChange = (event: RangeChangeEvent) => {
    const value = event.target.value;
    setMaxPrice(Number(value));
    dispatch(changeMaxPrice(Number(value)));
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-md lg:text-lg font-semibold mb-4">Select Price per day</h2>
      <span className="text-[15px] lg:text-lg">
        Min Price: ${minPrice}
      </span>{" "}
      <input
      aria-label="select minimum price"
        type="range"
        min={min}
        max={maxPrice}
        value={minPrice}
        onChange={handleMinChange}
        className="my-4 max-w-[300px]"
      />
      <span className="text-[15px] lg:text-lg">
        Max Price: ${maxPrice}
      </span>
      <input
        type="range"
        aria-label="select maximum price"
        min={minPrice}
        max={max}
        value={maxPrice}
        onChange={handleMaxChange}
        className="my-4 max-w-[300px]"
      />
    </div>
  );
};

export default PriceRangeSlider;
