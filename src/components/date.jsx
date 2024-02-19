import React, { useState, useEffect } from "react";
const DayDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);
  const dayOfMonth = currentDate.getDate();
  return (
    <div>
        <p className="px-2 py-1">{dayOfMonth}</p>
    </div>
  )
};
export default DayDate;
