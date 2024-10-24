import React from "react";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTime.modules.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setRentalTime } from "../../redux/carRentalSlice/carRentalSlice";
import { selectEndRentalDate, selectStartRentalDate } from "../../redux/selectors";

const DateTime: React.FC<{ name: string }> = ({ name }) => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector(selectStartRentalDate);
  const endDate = useAppSelector(selectEndRentalDate);

  const minDate = new Date();

  const handleDataChanging = (date: Date | null) => {
    if (date) {
      dispatch(setRentalTime({ name, time: date.toISOString() }));
    }
  };
  
  return (
    <div className=" w-[100%] max-w-[350px] md:max-w-[45%] m-auto sm:w-[45%] mb-[10px] primary-background rounded-lg p-[10px] box-shadow">
      <p>{name}</p>
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
        className="cursor-pointer"
      />
    </div>
  );
};

export default DateTime;
