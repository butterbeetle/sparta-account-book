import Calendar from "../../components/Calendar";
import DataInputForm from "../../components/DataInputForm";
import RecordsList from "../../components/RecordsList";
import TotalOutlay from "../../components/TotalOutlay";

export default function HomePage({ recordsData, setData }) {
  return (
    <main>
      <DataInputForm setData={setData} />
      <Calendar />
      <TotalOutlay />
      <RecordsList recordsData={recordsData} />
    </main>
  );
}
