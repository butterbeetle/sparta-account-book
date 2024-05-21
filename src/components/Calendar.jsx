import { useEffect, useState } from "react";
import formatDate from "../utils/formatDate";

export default function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(
    localStorage.getItem("selectedMonth") ?? +formatDate(new Date(), "month")
  );

  useEffect(() => {
    localStorage.setItem("selectedMonth", selectedMonth);
  }, [selectedMonth]);

  return (
    <div className="p-4 bg-slate-300">
      <ul className="flex flex-wrap gap-2 justify-center items-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
          <li
            onClick={() => setSelectedMonth(month)}
            className={`w-[15%] bg-slate-400 text-center min-w-[60px] p-2 border-2 border-solid border-slate-500 rounded-md ${
              month == selectedMonth ? "bg-slate-600 text-white" : ""
            }`}
            key={month}
          >
            {month}월
          </li>
        ))}
      </ul>
    </div>
  );
}
