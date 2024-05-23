import Calendar from "../../components/Calendar";
import DataInputForm from "../../components/DataInputForm";
import RecordsList from "../../components/RecordsList";
import TotalOutlay from "../../components/TotalOutlay";

export default function HomePage({ setRecordsData }) {
  return (
    <main>
      <DataInputForm setRecordsData={setRecordsData} />
      <Calendar />
      <TotalOutlay />
      <RecordsList />
    </main>
  );
}
