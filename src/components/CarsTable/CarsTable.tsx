import React from "react";
import CarString from "./CarString";
import { useAppSelector } from "../../hooks";
import { selectAdminSearchResult } from "../../redux/selectors";

const CarsTable: React.FC = () => {
    const listForRender = useAppSelector(selectAdminSearchResult)
  return (
    <div>
      <table className="w-full border-collapse rounded-lg overflow-hidden box-shadow">
        <thead className="secondary-background">
          <tr className="">
          <th className="p-[10px]">Number</th>
            <th className="p-[10px]">Id</th>
            <th className="p-[10px]">Make</th>
            <th className="p-[10px]">Model</th>
            <th className="p-[10px]">Year</th>
            <th className="p-[10px]">Type</th>
            <th className="p-[10px]">Fuel</th>
            <th className="p-[10px]">Transmission</th>
            <th className="p-[10px]">Removed</th>
          </tr>
        </thead>
        <tbody>
          {listForRender?.map((car, index) => (
            <CarString key={car._id} car={car} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarsTable;