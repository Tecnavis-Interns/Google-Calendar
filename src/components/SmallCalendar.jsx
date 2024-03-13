import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";
import { getMonth } from "../util"; // Ensure correct import path

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState([]);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected, setMonthIndex } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex, setMonthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
    setMonthIndex(currentMonthIdx - 1); // Update monthIndex in global context
  }
  
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
    setMonthIndex(currentMonthIdx + 1); // Update monthIndex in global context
  }

  function getDay(day) {
    const format = "DD-MM-YY";
    const thisDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (thisDay === currDay) {
      return "todayDate rounded-full text-white";
    } else if (currDay === slcDay) {
      return "selectDate rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }

  // Set the date to the first day of the current month
  const firstDayOfMonth = dayjs()
    .set("month", currentMonthIdx)
    .startOf("month");

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="font-bold monthText">
          {dayjs()
            .set("month", currentMonthIdx)
            .startOf("month")
            .format("MMMM YYYY")}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className="material-symbols-outlined cursor-pointer mx-2 monthText">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-symbols-outlined cursor-pointer mx-2 monthText">
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth &&
          currentMonth[0] &&
          currentMonth[0].map((day, i) => (
            <span key={i} className="text-sm py-1 text-center">
              {day.format("dd").charAt(0)}
            </span>
          ))}

        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`py-1 w-full ${getDay(day)}`}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
