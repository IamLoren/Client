import React, { useEffect } from "react";
import Card from "../Card/Card";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllCarsThunk } from "../../redux/carRentalSlice/operations";
import {
  selectAllCars,
  selectCarTypeFilter,
  selectedTransmissionType,
  selectRole,
  selectUserListOfCars,
} from "../../redux/selectors";

const CardsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector(selectAllCars);
  const role = useAppSelector(selectRole);
  const carsUserList = useAppSelector(selectUserListOfCars);
  const listOfCars = role === "admin" ? cars : carsUserList;
  const selectedTypes = useAppSelector(selectCarTypeFilter);
  const selectedTransmissions = useAppSelector(selectedTransmissionType);
  let carsForRender;

  if (selectedTypes.length === 0 && selectedTransmissions.length === 0) {
    carsForRender = listOfCars;
  } else if (selectedTypes.length === 0 && selectedTransmissions.length > 0) {
    carsForRender = listOfCars.filter((car) =>
      selectedTransmissions.includes(car.transmission)
    );
  } else if (selectedTypes.length > 0 && selectedTransmissions.length === 0) {
    carsForRender = listOfCars.filter((car) =>
      selectedTypes.includes(car.type)
    );
  } else {
    carsForRender = listOfCars
      .filter((car) => selectedTransmissions.includes(car.transmission))
      .filter((car) => selectedTypes.includes(car.type));
  }

  useEffect(() => {
    dispatch(getAllCarsThunk());
  }, [dispatch]);

  return (
    <div className="h-[800px] overflow-y-scroll">
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(275px,1fr))] gap-[29px] mb-[50px]">
        {carsForRender?.map((car) => {
          return <Card key={car._id} carProps={car} />;
        })}
      </ul>
    </div>
  );
};

export default CardsList;
