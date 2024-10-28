import React from "react";
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
 
  const handleMinChange = (event: RangeChangeEvent) => {
    const value = event.target.value;
    dispatch(changeMinPrice(Number(value)))
  };

  const handleMaxChange = (event: RangeChangeEvent) => {
    const value = event.target.value;
    dispatch(changeMaxPrice(Number(value)));
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-md lg:text-lg font-semibold mb-4">Select Price per day</h2>
      <span data-cy="minPrice" className="text-[15px] lg:text-lg">
        Min Price: ${selectedMinPrice}
      </span>{" "}
      <input
      aria-label="select minimum price"
        type="range"
        min={min}
        max={selectedMaxPrice}
        value={selectedMinPrice}
        onChange={handleMinChange}
        className="my-4 max-w-[300px] cursor-pointer"
      />
      <span data-cy="maxPrice" className="text-[15px] lg:text-lg">
        Max Price: ${selectedMaxPrice}
      </span>
      <input
        type="range"
        aria-label="select maximum price"
        min={selectedMinPrice}
        max={max}
        value={selectedMaxPrice}
        onChange={handleMaxChange}
        className="my-4 max-w-[300px] cursor-pointer"
      />
    </div>
  );
};

export default PriceRangeSlider;
