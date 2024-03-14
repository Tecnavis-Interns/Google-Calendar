import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import collection and addDoc functions

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

export { db };

export const addEventToFirestore = async (title, description, date, color) => {
  console.log("Title:", title);
  console.log("Description:", description);
  console.log("Date:", date);
  console.log("Color:", color);
  // console.log("Date:", currentDate);
  try {
    const docRef = await addDoc(collection(db, "Calendar"), {
      title,
      description,
      date,
      color,
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Save Successful");
    return docRef.id; // Return the ID of the newly added document
  } catch (error) {
    console.error("Error adding document: ", error);
    return null; // Return null if there's an error
  }
};
