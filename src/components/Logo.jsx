import React from "react";
import DayDate from "./date";

export default function Logo() {
  return (
    <>
      <div className="calendarLogo">
        {/* div to get colors on corners and center white space */}
        <div className="topRightCorner"></div>
        <div className="bottomLeftCorner"></div>
        <div className="bottomRightCorner"></div>
        <div className="innerSpace">
          <DayDate />
        </div>
      </div>
    </>
  );
}
