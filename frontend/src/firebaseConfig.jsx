import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBbXkjcy99PEYbnMDpzpP314Vn2EASBlsU",
  authDomain: "interview-helper-8d5cd.firebaseapp.com",
  projectId: "interview-helper-8d5cd",
  storageBucket: "interview-helper-8d5cd.appspot.com",
  messagingSenderId: "1021808076149",
  appId: "1:1021808076149:web:bd177d4c588f971691df3c",
  measurementId: "G-HX1HXLEEQL"
}

const app = initializeApp(firebaseConfig)
const firebaseDB = getFirestore(app)

export { firebaseDB }