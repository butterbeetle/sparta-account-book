import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "../slices/error.slice";
import recordSlice from "../slices/record.slice";

const store = configureStore({
  reducer: {
    record: recordSlice,
    error: errorSlice,
  },
});

export default store;
