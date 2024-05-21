import { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
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

export default function DataInputForm({ setRecordsData }) {
  const [inputData, setInputData] = useState(initInputData);
  const [error, setError] = useState(initErrorData);

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

    setRecordsData((prev) => [...prev, { id: uuidv4(), ...inputData }]);

    setInputData(initInputData);
    setError(initErrorData);
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
      <button>추가</button>
    </Form>
  );
}
