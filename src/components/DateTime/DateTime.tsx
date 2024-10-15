import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const DateTime: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(
        setHours(setMinutes(new Date(), 30), 16),
      );
  return (
    <div className=" w-[45%] primary-background rounded-lg">
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
    />
    </div>
  );
};

export default DateTime;
