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
  const [selectedEvent, setSelectedEvent] = useState(null);

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
  const openPopup = (event) => {
    setSelectedEvent(event);
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };
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
          <div
            key={index}
            className={`bg-${event.color}-500 w-full px-2 rounded eventFont text-sm text-white mb-1 overflow-hidden hover:cursor-pointer`}
            onClick={() => openPopup(event)}
          >
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
      {/* Popup div */}
      {selectedEvent && (
        <div className="popup-container">
          <div className="popup">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h2 className="bg-white mr-2 pl-5 text-Black py-2 mt-1 font-serif" >{selectedEvent.title}</h2>
            <p className="bg-white mr-2 pl-5 text-Black py-2 mt-3 h-20">{selectedEvent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
