import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import formatDate from "../../utils/formatDate";

const initialInputsData = {
  date: formatDate(new Date()),
  category: "",
  amount: "",
  content: "",
};

const getLocalStorageData = () => {
  const initialData = {
    selectedMonth: +formatDate(new Date(), "month"),
    recordsData: [],
  };

  const localStorageData = localStorage.getItem("data");
  if (localStorageData) {
    return JSON.parse(localStorageData);
  } else return initialData;
};

const initialState = getLocalStorageData();

const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    addRecordDataHandler(state, action) {
      const { payload } = action;
      state.recordsData.push({ id: uuidv4(), ...payload });
    },
    updateRecordDataHandler(state, action) {
      const {
        payload: { recordId, updatedData },
      } = action;
      state.recordsData = state.recordsData.map((recordData) =>
        recordData.id === recordId ? updatedData : recordData
      );
    },
    deleteRecordDataHandler(state, action) {
      const {
        payload: { recordId },
      } = action;
      state.recordsData = state.recordsData.filter(
        (recordData) => recordData.id !== recordId
      );
    },
    monthSelectHandler(state, action) {
      state.selectedMonth = action.payload;
    },
    getInitalData(state, action) {
      return (
        state.recordsData.filter(
          (recordData) => recordData.id === action.payload.id
        ) ?? initialInputsData
      );
    },
  },
});

export const {
  addRecordDataHandler,
  updateRecordDataHandler,
  deleteRecordDataHandler,
  monthSelectHandler,
  getInitalData,
} = recordsSlice.actions;
export default recordsSlice.reducer;
