import React from "react";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTime.modules.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setRentalTime } from "../../redux/carRentalSlice/carRentalSlice";
import {
  selectEndRentalDate,
  selectRole,
  selectStartRentalDate,
} from "../../redux/selectors";
import { useLocation } from "react-router-dom";

const DateTime: React.FC<{ name: string }> = ({ name }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const role = useAppSelector(selectRole);
  const startDate = useAppSelector(selectStartRentalDate);
  const endDate = useAppSelector(selectEndRentalDate);

  const minDate = new Date(startDate);

  const handleDataChanging = (date: Date | null) => {
    if (date) {
      const isoDate = date.toISOString();
      dispatch(setRentalTime({ name, time: isoDate }));
    }
  };

  return (
    <div
      data-cy={`${name}`}
      className={`${(role==="admin" && location.pathname === "/admin/history") && "block w-full px-4 py-1 secondary-background border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0"} ${(role==="user" || (role==="admin" && location.pathname === "/")) && "w-[100%] max-w-[350px] md:max-w-[45%] m-auto sm:w-[45%] mb-[10px] primary-background rounded-lg p-[10px] box-shadow"}`}
    >
      {(role==="user" || (role==="admin" && location.pathname === "/")) && <p>{name}</p>}
      <DatePicker
        selected={name === "Pick-Up" ? new Date(startDate) : new Date(endDate)}
        onChange={(date) => handleDataChanging(date)}
        showTimeSelect
        excludeTimes={[
          setHours(setMinutes(new Date(), 0), 17),
          setHours(setMinutes(new Date(), 30), 18),
          setHours(setMinutes(new Date(), 30), 19),
          setHours(setMinutes(new Date(), 30), 17),
        ]}
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={minDate}
        minTime={setHours(
          setMinutes(minDate, minDate.getMinutes()),
          minDate.getHours()
        )}
        maxTime={setHours(setMinutes(new Date(), 30), 23)}
        className={`cursor-pointer ${(role==="admin" && location.pathname === "/admin/history") && "block w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"}`}
      />
    </div>
  );
};

export default DateTime;
