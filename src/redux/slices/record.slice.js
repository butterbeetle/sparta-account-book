import { createSlice } from "@reduxjs/toolkit";
import formatDate from "../../utils/formatDate";

const initialState = {
  selectedMonth: +formatDate(new Date(), "month"),
  recordsData: [],
};

const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    addRecordDataHandler(state, action) {
      console.log("addRecordDataHandler", state, action);
    },
    updateRecordDataHandler(state, action) {
      console.log("updateRecordDataHandler", state, action);
    },
    deleteRecordDataHandler(state, action) {
      console.log("deleteRecordDataHandler", state, action);
    },
    monthSelectHandler(state, action) {
      console.log("monthSelectHandler", state, action);
    },
  },
});

export const {
  addRecordDataHandler,
  updateRecordDataHandler,
  deleteRecordDataHandler,
  monthSelectHandler,
} = recordsSlice.actions;
export default recordsSlice.reducer;
