import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import formatDate from "../utils/formatDate";

export const RecordContext = createContext(null);

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

export default function RecordContextProvider({ children }) {
  const [data, setData] = useState(getLocalStorageData());

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const addDataHandler = (newData) => {
    setData((prev) => ({
      ...prev,
      recordsData: [...prev.recordsData, { id: uuidv4(), ...newData }],
    }));
  };

  const updateDataHandler = (id, updatedData) => {
    setData((prev) => ({
      ...prev,
      recordsData: prev.recordsData.map((recordData) =>
        recordData.id === id ? updatedData : recordData
      ),
    }));
  };

  const deleteDataHandler = (id) => {
    setData((prev) => ({
      ...prev,
      recordsData: prev.recordsData.filter(
        (prevRecord) => prevRecord.id !== id
      ),
    }));
  };

  const getInitialData = (id) => {
    return data.recordsData.filter((recordData) => recordData.id === id)[0];
  };

  const selectedMonthHandler = (selectedMonth) => {
    setData((prev) => ({ ...prev, selectedMonth }));
  };

  return (
    <RecordContext.Provider
      value={{
        data,
        selectedMonthHandler,
        addDataHandler,
        updateDataHandler,
        deleteDataHandler,
        getInitialData,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
}
