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
  const leftPadding = dayOfMonth < 10 ? "12px" : "8px";

  return (
    <div>
      <p className="py-1 day" style={{ paddingLeft: leftPadding }}>
        {dayOfMonth}
      </p>
    </div>
  );
};

export default DayDate;
