import { createSlice } from "@reduxjs/toolkit";
import formatDate from "../../utils/formatDate";

const initialState = {
  date: formatDate(new Date()),
  category: "",
  amount: "",
  content: "",
};

const inputSlice = createSlice({
  name: "inputData",
  initialState,
  reducers: {},
});
