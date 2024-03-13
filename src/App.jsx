import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { HomeHeader } from "./components/header";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import { getMonth } from "./util";
import AddEvent from "./components/Event/AddEvent";
import GlobalContext from "./contexts/GlobalContext";
import { initializeApp } from 'firebase/app';
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from './components/SignIn'
import { getAuth } from "firebase/auth";

const firebaseConfig = ({
  apiKey: "AIzaSyDqOulC8RBC2m0BqKt5i27QKy3af-FACSk",
  authDomain: "calender-clone.firebaseapp.com",
  projectId: "calender-clone",
  storageBucket: "calender-clone.appspot.com",
  messagingSenderId: "926350498060",
  appId: "1:926350498060:web:c7f062f443c8bf6c6f1129",
  measurementId: "G-X01NPX82NM",
});

const app = initializeApp(firebaseConfig)
const auth = getAuth()

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
