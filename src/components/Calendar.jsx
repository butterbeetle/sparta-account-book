import { useEffect } from "react";
import styled from "styled-components";

const CalendarDiv = styled.div`
  padding: 16px;
  background: #cbd5e1;
`;

const CalendarUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

const Calendarli = styled.li`
  padding: 8px;
  border-radius: 8px;
  border-width: 2px;
  border-style: solid;
  text-align: center;
  width: 15%;
  min-width: 60px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? "#696b6e" : "#a1aab6"};
  color: ${({ $isSelected }) => ($isSelected ? "white" : "black")};
  cursor: pointer;
`;

export default function Calendar({ selectedMonth, setSelectedMonth }) {
  useEffect(() => {
    localStorage.setItem("selectedMonth", selectedMonth);
  }, [selectedMonth]);

  return (
    <CalendarDiv>
      <CalendarUl>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
          <Calendarli
            $isSelected={selectedMonth == month ? true : undefined}
            onClick={() => setSelectedMonth(month)}
            key={month}
          >
            {month}월
          </Calendarli>
        ))}
      </CalendarUl>
    </CalendarDiv>
  );
}
