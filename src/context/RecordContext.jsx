import { createContext, useState } from "react";
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

  const getInitialData = (id) => {
    return data.recordsData.filter((recordData) => recordData.id === id)[0];
  };

  return (
    <RecordContext.Provider
      value={{
        getInitialData,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
}
