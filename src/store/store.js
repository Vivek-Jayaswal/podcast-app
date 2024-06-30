import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import podcastSlice from "../slices/podcastSlice";


const store = configureStore({
    reducer : {
        user : userSlice,
        podcasts : podcastSlice,
    }
})

export default store;
console.log(store.getState().user);