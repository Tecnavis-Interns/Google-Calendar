import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import GlobalContext from "../contexts/GlobalContext";
import dayjs from "dayjs";
import { getAuth, signOut } from "firebase/auth";

export function HomeHeader() {
  const auth = getAuth()
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
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

  function handleReset() {
    window.location.reload(false);
  }



  return (
    <>
    <div className="flex justify-between px-5">
    <div className="header flex items-center items-center">
        <Logo />
        <p className="calendarName">Calendar</p>
        <button onClick={handleReset} className="buttonToday rounded py-2 px-2">
          Today
        </button>
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
          {dayjs()
            .set("month", monthIndex)
            .startOf("month")
            .format("MMMM YYYY")}
        </h2>
    </div>
      <div className="flex items-center gap-3">
        <img src={auth.currentUser.photoURL} alt="" width='40px' className="rounded-full"/>
        <h4 className="font-bold">{auth.currentUser.displayName}</h4>
        <button onClick={() => signOut(auth)} className="btn">Sign Out</button>
      </div>
      </div>
    </>
  );
}
