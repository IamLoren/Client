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
    <form>
      <h2 className="text-lg font-semibold mb-4">Select Car Types</h2>
      {carTypes.map((type) => (
        <div key={type}>
          <label>
            <input
              type="checkbox"
              name="selectedTypes"
              value={type}
              checked={formik.values.selectedTypes.includes(type)}
              onChange={() => handleCheckboxChange(type)}
            />
            {type}
          </label>
        </div>
      ))}
    </form>
  );
};

export default TypeFilter;
