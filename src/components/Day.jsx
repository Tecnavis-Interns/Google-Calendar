import React, { useContext } from "react";
import dayjs from "dayjs";
import GlobalContext from "../contexts/GlobalContext";

export default function Day({ day, rowIdx }) {
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "todayDate text-white rounded-full w-7"
      : "";
  }
  const { setDaySelected, setShowAddEvent } = useContext(GlobalContext);
  return (
    <div className=" border calendarBorder flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowAddEvent(true);
        }}
      >{""}</div>
    </div>
  );
}
