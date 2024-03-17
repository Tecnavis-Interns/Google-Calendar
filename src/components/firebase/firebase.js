import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; // Import

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
const db = getFirestore(app);
const auth = getAuth();
let userEmail = null;

const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    userEmail = user.email;
    console.log("User email:", userEmail);
    // You can use the userEmail here or pass it to another function
  } else {
    userEmail = null;
    // User is signed out
    console.log("No user signed in");
  }
});

export { db, userEmail };

export const addEventToFirestore = async (title, description, date, color) => {
  console.log("Title:", title);
  console.log("Description:", description);
  console.log("Date:", date);
  console.log("Color:", color);
  console.log("Check:", userEmail);
  // console.log("Date:", currentDate);
  try {
    const docRef = await addDoc(collection(db, "Calendar"), {
      title,
      description,
      date,
      color,
      userEmail,
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Save Successful");
    return docRef.id; // Return the ID of the newly added document
  } catch (error) {
    console.error("Error adding document: ", error);
    return null; // Return null if there's an error
  }
};

const getEventsByDate = async (date) => {
  try {
    const eventsRef = collection(db, "Calendar");
    const querySnapshot = await getDocs(eventsRef);
    const events = querySnapshot.docs
      .filter((doc) => {
        const eventData = doc.data();
        return (
          eventData.date === date.format("dddd, MMMM DD") &&
          eventData.userEmail === userEmail
        );
      }) // Filter events based on the provided date
      .map((doc) => ({ id: doc.id, ...doc.data() }));
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export { getEventsByDate };
