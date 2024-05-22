import { useParams } from "react-router-dom";
import DataInputForm from "../../components/DataInputForm";

export default function RecordDetailPage({ recordsData, setRecordsData }) {
  const { recordId } = useParams();
  const filteredRecord = recordsData.filter(({ id }) => id === recordId)[0];

  return (
    <div>
      <DataInputForm
        setRecordsData={setRecordsData}
        initData={filteredRecord}
      />
    </div>
  );
}
