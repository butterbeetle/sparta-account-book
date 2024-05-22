import { useParams } from "react-router-dom";
import DataInputForm from "../../components/DataInputForm";

export default function RecordDetailPage({ recordsData, setRecordsData }) {
  const { recordId } = useParams();
  const filteredRecord = recordsData.filter(({ id }) => id === recordId)[0];
  const { id, date, category, amount, content } = filteredRecord;

  return (
    <div>
      <DataInputForm
        setRecordsData={setRecordsData}
        initData={filteredRecord}
      />
      <p>{id}</p>
      <p>{date}</p>
      <p>{category}</p>
      <p>{amount}</p>
      <p>{content}</p>
    </div>
  );
}
