import DataInputForm from "../../components/DataInputForm";

export default function HomePage({ data, setData }) {
  return (
    <main>
      <DataInputForm setData={setData} />
      <div>총 지출</div>
      <div>달력</div>
      <div>지출 목록</div>
    </main>
  );
}
