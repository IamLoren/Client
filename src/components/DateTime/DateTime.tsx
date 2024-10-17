import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./DateTime.modules.css";

const DateTime: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(
        setHours(setMinutes(new Date(), 30), 16),
      );
      const minDate = new Date();
      console.log(startDate)
  return (
    <div className=" w-[45%] primary-background rounded-lg p-[10px] box-shadow">
       <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
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
