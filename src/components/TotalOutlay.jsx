export default function TotalOutlay({ selectedMonth, recordsData }) {
  const filteredRecordsData = recordsData.filter(
    ({ date }) => +date.split("-")[1] === +selectedMonth
  );
  console.log("recordsData", filteredRecordsData);
  return <div className="p-2 bg-slate-300">TotalOutlay - 총 지출</div>;
}
