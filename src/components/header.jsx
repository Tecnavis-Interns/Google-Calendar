import React from "react";

export function HomeHeader() {
  return (
    <>
      <div className="header">
        <div className="calendarLogo">
          <div class="topRightCorner"></div>
          <div class="bottomLeftCorner"></div>
          <div class="bottomRightCorner"></div>
          <div className="innerSpace"></div>
        </div>
        <p className="calendarName">Calendar</p>
        <button className="buttonToday rounded py-2 px-4 mr-5">Today</button>
      </div>
    </>
  );
}
