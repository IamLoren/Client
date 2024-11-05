import React from "react";
import { CarInterface } from "../../redux/carRentalSlice/carRentalSliceTypes";

const CarString: React.FC<{car:CarInterface, index: number }> = ({
  car,
  index,
}) => {
  return (
    <tr className="bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors">
      <td className="p-2 border-b border-gray-200 text-center">{index + 1}</td>
      <td className="p-2 border-b border-gray-200 text-center">{car._id}</td>
      <td className={`p-2 border-b border-gray-200 text-center font-medium`}>{car.make}</td>
      <td className="p-2 border-b border-gray-200 text-center text-sm font-semibold">
        {car.model}
      </td>
      <td className="p-2 border-b border-gray-200 text-center">{car.year}</td>
      <td  className={`p-2 border-b border-gray-200 text-center font-medium`}>
        {car.type}
      </td>
      <td  className={`p-2 border-b border-gray-200 text-center font-medium`}>
        {car.fuel}
      </td>
      <td  className={`p-2 border-b border-gray-200 text-center font-medium`}>
        {car.transmission}
      </td>
      <td  className={`p-2 border-b border-gray-200 text-center font-medium`}>
        {car.isRemoved === true ? "yes" : "No"}
      </td>
    </tr>
  );
};

export default CarString;