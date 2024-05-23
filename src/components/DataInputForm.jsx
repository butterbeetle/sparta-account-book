import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import DataInput from "../components/DataInput";
import { RecordContext } from "../context/RecordContext";
import {
  addRecordDataHandler,
  deleteRecordDataHandler,
  updateRecordDataHandler,
} from "../redux/slices/record.slice";
import formatDate from "../utils/formatDate";
import validateInput from "../utils/validateInput";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 8px;
  background: #cbd5e1;
`;

const initialInputsData = {
  date: formatDate(new Date()),
  category: "",
  amount: "",
  content: "",
};

const initialErrorsData = {
  date: false,
  category: false,
  amount: false,
  content: false,
};

const inputsData = [
  { id: "date", type: "date", label: "날짜" },
  { id: "category", type: "text", label: "항목" },
  { id: "amount", type: "text", label: "금액" },
  { id: "content", type: "text", label: "내용" },
];

export default function DataInputForm() {
  const { recordId } = useParams();
  const nav = useNavigate();

  const dispatch = useDispatch();

  const { getInitialData } = useContext(RecordContext);

  const [inputData, setInputData] = useState(
    getInitialData(recordId) ?? initialInputsData
  );

  const [error, setError] = useState(initialErrorsData);

  const isUpdate = recordId ?? false;
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const validateErrors = validateInput(inputData);

    if (Object.values(validateErrors).some((error) => error)) {
      setError({
        ...initialErrorsData,
        ...validateErrors,
      });
      return;
    }

    if (isUpdate) {
      dispatch(updateRecordDataHandler({ recordId, updatedData: inputData }));
      nav("/");
    } else {
      dispatch(addRecordDataHandler(inputData));
    }

    setInputData(initialInputsData);
    setError(initialErrorsData);
  };

  const onDeleteHandler = () => {
    if (window.confirm("정말로 이 지출 항목을 삭제하시겠습니까?")) {
      dispatch(deleteRecordDataHandler({ recordId }));
      nav("/");
    }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      {inputsData.map(({ id, type, label }) => (
        <DataInput
          key={id}
          id={id}
          type={type}
          label={label}
          inputData={inputData}
          error={error}
          setInputData={setInputData}
        />
      ))}
      <button type="submit">{isUpdate ? "수정" : "추가"}</button>
      {isUpdate && (
        <button onClick={onDeleteHandler} type="button">
          삭제
        </button>
      )}
    </Form>
  );
}
