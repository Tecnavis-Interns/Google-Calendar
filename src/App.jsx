import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { HomeHeader } from "./components/header";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import { getMonth } from "./util";
import AddEvent from "./components/Event/AddEvent";
import GlobalContext from "./contexts/GlobalContext";
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "./components/SignIn";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCNcbGrE7DNUStcz91R41-DIY3jkGMD9-I",
  authDomain: "calendar-clone90.firebaseapp.com",
  projectId: "calendar-clone90",
  storageBucket: "calendar-clone90.appspot.com",
  messagingSenderId: "365727045115",
  appId: "1:365727045115:web:d2f9974bf6c818b741a75e",
  measurementId: "G-2G28X2TGVW",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showAddEvent } = useContext(GlobalContext);

  const [user] = useAuthState(auth);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {user ? (
        <>
          <HomeHeader />
          <React.Fragment>
            {showAddEvent && <AddEvent />}
            <div className="h-screen flex flex-col calendarH">
              <h1 className="text-2xl font-bold hover:underline"></h1>
              <div className="flex flex-1">
                <Sidebar />
                <Month month={currentMonth} />
              </div>
            </div>
          </React.Fragment>
        </>
      ) : (
        <SignIn />
      )}
    </>
  );
}

export default App;
