import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducers";
import userReducers from "./reducers/userReducers";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
