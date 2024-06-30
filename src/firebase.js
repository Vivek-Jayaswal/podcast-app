import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4sibg1AoQuA8sO-BKo0YtKx05Q0WKGQg",
  authDomain: "react-podcast-app-3f146.firebaseapp.com",
  projectId: "react-podcast-app-3f146",
  storageBucket: "react-podcast-app-3f146.appspot.com",
  messagingSenderId: "739513566309",
  appId: "1:739513566309:web:cadb4a40b835feca46328c",
  measurementId: "G-0N580C01R6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth,db,storage}
