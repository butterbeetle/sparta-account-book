import Calendar from "../../components/Calendar";
import DataInputForm from "../../components/DataInputForm";
import RecordsList from "../../components/RecordsList";
import TotalOutlay from "../../components/TotalOutlay";

export default function HomePage({
  recordsData,
  setRecordsData,
  selectedMonth,
  setSelectedMonth,
}) {
  return (
    <main>
      <DataInputForm setRecordsData={setRecordsData} />
      <Calendar
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <TotalOutlay />
      <RecordsList selectedMonth={selectedMonth} recordsData={recordsData} />
    </main>
  );
}
