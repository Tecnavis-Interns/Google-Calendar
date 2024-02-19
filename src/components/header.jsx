import React from "react";
import DayDate from "./date";

export function HomeHeader() {
  return (
    <>
      <div className="header flex items-center px-4 py-2">
        <div className="calendarLogo">
          <div className="topRightCorner"></div>
          <div className="bottomLeftCorner"></div>
          <div className="bottomRightCorner"></div>
          <div className="innerSpace"><DayDate /></div>
        </div>
        
        <p className="calendarName">Calendar</p>
        <button className="buttonToday rounded py-2 px-5">Today</button>
      
      </div>
    </>
  );
}
