import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { RecordContext } from "../context/RecordContext";
import formatDate from "../utils/formatDate";
import validateInput from "../utils/validateInput";
import DataInput from "./DataInput";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 8px;
  background: #cbd5e1;
`;

const initInputData = {
  date: formatDate(new Date()),
  category: "",
  amount: "",
  content: "",
};

const initErrorData = {
  date: false,
  category: false,
  amount: false,
  content: false,
};

export default function DataInputForm() {
  const {
    addDataHandler,
    updateDataHandler,
    deleteDataHandler,
    getInitialData,
  } = useContext(RecordContext);
  const { recordId } = useParams();

  const [inputData, setInputData] = useState(
    getInitialData(recordId) ?? initInputData
  );
  const [error, setError] = useState(initErrorData);

  const isUpdate = recordId ?? false;
  const nav = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const validateErrors = validateInput(inputData);

    if (Object.values(validateErrors).some((error) => error)) {
      setError({
        ...initErrorData,
        ...validateErrors,
      });
      return;
    }

    if (isUpdate) {
      updateDataHandler(recordId, inputData);
      nav("/", { replace: true });
    } else {
      addDataHandler(inputData);
    }

    setInputData(initInputData);
    setError(initErrorData);
  };

  const onDeleteHandler = () => {
    deleteDataHandler(recordId);
    nav("/", { replace: true });
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <DataInput
        id="date"
        type="date"
        label="날짜"
        error={error}
        inputData={inputData}
        setInputData={setInputData}
      />
      <DataInput
        id="category"
        label="항목"
        error={error}
        inputData={inputData}
        setInputData={setInputData}
      />
      <DataInput
        id="amount"
        label="금액"
        error={error}
        inputData={inputData}
        setInputData={setInputData}
      />
      <DataInput
        id="content"
        label="내용"
        error={error}
        inputData={inputData}
        setInputData={setInputData}
      />
      <button type="submit">{isUpdate ? "수정" : "추가"}</button>
      {isUpdate && (
        <button onClick={onDeleteHandler} type="button">
          삭제
        </button>
      )}
    </Form>
  );
}
