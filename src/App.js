import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignInSignup from "./components/pages/SignInSignup.js";
import Profile from "./components/pages/Profile.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth,db } from "./firebase.js";
import { doc,onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice.js";
import { useDispatch } from "react-redux";
import PrivateRoute from "./components/pages/PrivateRoute.js";
import CreatePodcast from "./components/pages/CreatePodcast.js";
import PodcastPage from "./components/pages/PodcastPage.js";
import PodcastDetailsPage from "./components/pages/PodcastDetailsPage.js";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unSubscribeSnapShot = onSnapshot(doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(setUser({
                name: userData.name,
                email: userData.email,
                uid: user.uid
              }));
            }
          },
          (error) => {
            console.log("error fetching user data ", error);
            toast.error("error fetching data");
          }
        );
        return () => {
          unSubscribeSnapShot();
        }
      }
    });

    return () => {
      unSubscribeAuth();
    }
  }, [])


  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInSignup />} />
          <Route element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-a-podcast" element={<CreatePodcast />} />
            <Route path="/podcast" element={<PodcastPage/>} />
            <Route path="/podcast/:id" element={<PodcastDetailsPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;