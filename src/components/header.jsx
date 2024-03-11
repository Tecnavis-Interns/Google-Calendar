import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import GlobalContext from "../contexts/GlobalContext";
import dayjs from "dayjs";

export function HomeHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof monthIndex === "undefined") {
      setMonthIndex(dayjs().month());
    }

    setLoading(false);
  }, [setMonthIndex, monthIndex, loading]);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset(){
    setMonthIndex(dayjs().month());
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="header flex items-center px-4 py-2">
        <Logo />
        <p className="calendarName">Calendar</p>
        <button onClick={handleReset} className="buttonToday rounded py-2 px-2">Today</button>
        <div className="arrow">
          <button onClick={handlePrevMonth}>
            <span className="material-symbols-outlined px-2 py-1">
              arrow_back_ios
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
        </div>
        <h2 className="ml-4 text-xl font-bold monthText">
          {dayjs().set('month', monthIndex).startOf('month').format("MMMM YYYY")}
        </h2>
      </div>
    </>
  );
}
