import { configureStore } from "@reduxjs/toolkit";
import recordSlice from "../slices/record.slice";

const store = configureStore({
  reducer: {
    record: recordSlice,
  },
});

export default store;
