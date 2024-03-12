import React, { useContext, useState } from "react";
import GlobalContext from "../../contexts/GlobalContext";

export default function AddEvent() {
  const { setShowAddEvent ,daySelected} = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4" action="">
        <header className="eventHead px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <button onClick={() => setShowAddEvent(false)}>
            <span className="material-icons-outlined text-gray-400">close</span>
          </button>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={title}
              required
              className="pt-3 border-0 text-gray-400 text-xl font-semibold pb-2 w-full border-b-2 borderColorGray200 focus:outline-none focus:ring-0 borderColorBlue500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">schedule</span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
          </div>
        </div>
      </form>
    </div>
  );
}
