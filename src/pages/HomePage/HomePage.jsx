import { useEffect } from "react";
import { useSelector } from "react-redux";
import Calendar from "../../components/Calendar";
import DataInputForm from "../../components/DataInputForm";
import RecordsList from "../../components/RecordsList";
import TotalOutlay from "../../components/TotalOutlay";

export default function HomePage() {
  const data = useSelector((state) => state.record);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <main>
      <DataInputForm />
      <Calendar />
      <TotalOutlay />
      <RecordsList />
    </main>
  );
}
