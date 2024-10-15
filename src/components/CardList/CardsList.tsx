import React, { useEffect } from "react";
import Card from "../Card/Card";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllCarsThunk } from "../../redux/carRentalSlice/operations";
import { selectAllCars } from "../../redux/selectors";

const CardsList: React.FC = () => {
const dispatch = useAppDispatch();
const cars = useAppSelector(selectAllCars);

    useEffect(() => {
        dispatch(getAllCarsThunk())
    },[dispatch])

  return (
    <div>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))] gap-[29px] mb-[50px]">
          {cars.map((car) => {
            return <Card key={car._id} carProps={car} />;
          })}
        </ul>
    </div>
  );
};

export default CardsList;
