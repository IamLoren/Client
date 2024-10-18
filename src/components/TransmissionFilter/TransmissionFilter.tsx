import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAllCars, selectRole, selectUserListOfCars } from '../../redux/selectors';
import { useFormik } from 'formik';
import { changeCarTransmissionFilter } from '../../redux/carRentalSlice/carRentalSlice';

const TransmissionFilter:React.FC = () => {
    const dispatch = useAppDispatch();
    const cars = useAppSelector(selectAllCars);
    const role = useAppSelector(selectRole);
    const carsUserList = useAppSelector(selectUserListOfCars);
    const listOfCars = role === "admin" ? cars : carsUserList;

    const carTypes = Array.from(new Set(listOfCars.map(car => car.transmission)));

    const formik = useFormik({
        initialValues: {
          selectedTypes: [] as string[],
        },
        onSubmit: () => {
        },
      });

    const handleCheckboxChange = (transmission: string) => {
        const isChecked = formik.values.selectedTypes.includes(transmission);

        const updatedTypes = isChecked
          ? formik.values.selectedTypes.filter((t) => t !== transmission) 
          : [...formik.values.selectedTypes, transmission]; 

        formik.setFieldValue("selectedTypes", updatedTypes);
        dispatch(changeCarTransmissionFilter(updatedTypes)); 
      };
    
  return (
    <form className="mb-4">
        <h2 className="text-md lg:text-lg font-semibold mb-4">Select type of transmission</h2>
    {carTypes.map((type, index) => (
      <div key={index}>
        <label className="text-[15px] lg:text-lg">
          <input
            type="checkbox"
            name="selectedTypes"
            value={type}
            checked={formik.values.selectedTypes.includes(type)}
            onChange={() => handleCheckboxChange(type)}
            className="mr-[10px]"
          />
          {type}
        </label>
      </div>
    ))}
  </form>
  )
}

export default TransmissionFilter