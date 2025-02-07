import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./counterSlice"; // Import userSlice

export const store = configureStore({
  reducer: {
    users: userReducer, 
  },
});

export default store;
