import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { HomeHeader } from "./components/header";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import { getMonth } from "./util";
import GlobalContext from "./contexts/GlobalContext";
function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  
  return (
    <>
      <HomeHeader />

      <React.Fragment>
        <div className="h-screen flex flex-col">
          <h1 className="text-2xl font-bold hover:underline"></h1>
          <div className="flex flex-1">
            <Sidebar />
            <Month month={currentMonth} />
          </div>
        </div>
      </React.Fragment>
    </>
  );
}

export default App;
