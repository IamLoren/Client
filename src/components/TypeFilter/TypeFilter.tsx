import React from "react";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  selectAllCars,
  selectRole,
  selectUserListOfCars,
} from "../../redux/selectors";
import { changeCarTypeFilter } from "../../redux/carRentalSlice/carRentalSlice";

const TypeFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const cars = useAppSelector(selectAllCars);
  const role = useAppSelector(selectRole);
  const carsUserList = useAppSelector(selectUserListOfCars);
  const listOfCars = role === "admin" ? cars : carsUserList;

  const carTypes = Array.from(new Set(listOfCars.map((car) => car.type)));

  const formik = useFormik({
    initialValues: {
      selectedTypes: [] as string[],
    },
    onSubmit: () => {},
  });

  const handleCheckboxChange = (type: string) => {
    const isChecked = formik.values.selectedTypes.includes(type);

    const updatedTypes = isChecked
      ? formik.values.selectedTypes.filter((t) => t !== type)
      : [...formik.values.selectedTypes, type];

    formik.setFieldValue("selectedTypes", updatedTypes);
    dispatch(changeCarTypeFilter(updatedTypes));
  };

  return (
    <form className="mb-4">
      <h2 className="text-md lg:text-lg font-semibold mb-4">Select Car Types</h2>
      {carTypes.map((type) => (
        <div key={type}>
          <label className="text-[15px] lg:text-lg filters-color">
            <input
              aria-label={`select ${type}`}
              type="checkbox"
              name="selectedTypes"
              value={type}
              checked={formik.values.selectedTypes.includes(type)}
              onChange={() => handleCheckboxChange(type)}
              className="mr-[10px] filters-color"
            />
            {type}
          </label>
        </div>
      ))}
    </form>
  );
};

export default TypeFilter;
