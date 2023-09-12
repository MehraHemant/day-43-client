import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice
  },
});
