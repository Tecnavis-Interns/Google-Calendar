import React, { useContext, useState, useEffect } from "react"; // Import useState and useEffect
import dayjs from "dayjs";
import GlobalContext from "../contexts/GlobalContext";
import { getEventsByDate } from "./firebase/firebase.js";

export default function Day({ day, rowIdx }) {
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "todayDate text-white rounded-full w-7"
      : "";
  }

  // Function to retrieve data from firebase storage
  const [events, setEvents] = useState([]); // Initialize events state with useState

  useEffect(() => {
    // Retrieve events for the selected day
    const fetchData = async () => {
      try {
        const eventsData = await getEventsByDate(day);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, [day]); // Call useEffect whenever the 'day' prop changes

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
        {/* Display events for the day */}
        {events.map((event, index) => (
          <div key={index} className={`bg-${event.color}-500 w-full px-2 rounded eventFont text-sm text-white mb-1 overflow-hidden`}>
            {event.title} 
            {/* - {event.description} */}
          </div>
        ))}
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowAddEvent(true);
        }}
      >
        {""}
      </div>
    </div>
  );
}
