import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./features/bookmarkSlice";


export const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer, 
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
