import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import formatDate from "../utils/formatDate";

export const RecordContext = createContext(null);

const initialData = {
  selectedMonth:
    localStorage.getItem("selectedMonth") ?? +formatDate(new Date(), "month"),
  recordsData: [
    {
      id: "25600f72-56b4-41a7-a9c2-47358580e2f8",
      date: "2024-05-05",
      category: "식비",
      amount: 100000,
      content: "세광양대창",
    },
    {
      id: "25600f72-53b4-4187-a9c2-47358580e2f8",
      date: "2024-05-10",
      category: "도서",
      amount: 40500,
      content: "모던 자바스크립트",
    },
    {
      id: "24310f72-56b4-41a7-a9c2-458580ef1f8",
      date: "2024-02-02",
      category: "식비",
      amount: 50000,
      content: "회식",
    },
    {
      id: "25600f72-99b4-41z7-e4h6-47312365e2f8",
      date: "2024-02-02",
      category: "간식",
      amount: 500,
      content: "아이스크림",
    },
    {
      id: "25143e72-16e2-22a7-a9c2-47358580e2f8",
      date: "2024-02-02",
      category: "여행",
      amount: 1055000,
      content: "일본여행",
    },
    {
      id: "25600f72-97p2-14a7-a9c2-47363950e2t8",
      date: "2024-02-02",
      category: "미용",
      amount: 155000,
      content: "미용실",
    },
    {
      id: "24312f70-97q2-14a7-a9c2-47132950e2t8",
      date: "2024-02-02",
      category: "도서",
      amount: 75000,
      content:
        "자율주행차량 운전주행모드 자동 전환용 인식률 90% 이상의 다중 센서 기반 운전자 상태 인식 및 상황 인식 원천 기술 개발",
    },
  ],
};

export default function RecordContextProvider({ children }) {
  const [data, setData] = useState(initialData);

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

    localStorage.setItem("selectedMonth", selectedMonth);
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
