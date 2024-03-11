import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "../util";
import GlobalContext from "../contexts/GlobalContext";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, setSmallCalendarMonth } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }

  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  function getDay(day) {
    const format = "DD-MM-YY";
    const thisDay = dayjs().format(format);
    const currDay = day.format(format);
    if (thisDay === currDay) {
      return "todayDate rounded-full";
    } else {
      return "";
    }
  }

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="font-bold monthText">
          {dayjs().month(currentMonthIdx).format("MMMM YYYY")}
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
        {currentMonth[0].map((day, i) => {
          <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>;
        })}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
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
