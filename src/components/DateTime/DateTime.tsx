import React from "react";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTime.modules.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setRentalTime } from "../../redux/carRentalSlice/carRentalSlice";
import { selectStartRentalDate } from "../../redux/selectors";

const DateTime: React.FC<{ name: string }> = ({ name }) => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector(selectStartRentalDate);

  const minDate = new Date();

  const handleDataChanging = (date: Date | null) => {
    if (date) {
      dispatch(setRentalTime({ name, time: date }));
    }
  };
  
  return (
    <div className=" w-[45%] primary-background rounded-lg p-[10px] box-shadow">
      <p>{name}</p>
      <DatePicker
        selected={startDate}
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
      />
    </div>
  );
};

export default DateTime;
