import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function DataInputForm({
  setRecordsData,
  initData = initInputData,
}) {
  const [inputData, setInputData] = useState(initData);
  const [error, setError] = useState(initErrorData);
  // key값으로 id있는지 화긴
  /**
   * https://stackoverflow.com/questions/39282873/object-hasownproperty-yields-the-eslint-no-prototype-builtins-error-how-to
   */
  const isUpdate = Object.prototype.hasOwnProperty.call(initData, "id");
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
      setRecordsData((prevRecords) =>
        prevRecords.map((prevRecord) =>
          prevRecord.id == inputData.id ? { ...inputData } : prevRecord
        )
      );

      nav("/", { replace: true });
    } else {
      setRecordsData((prevRecords) => [
        ...prevRecords,
        { id: uuidv4(), ...inputData },
      ]);
    }

    setInputData(initInputData);
    setError(initErrorData);
  };

  const onDeleteHandler = () => {
    setRecordsData((prevRecords) =>
      prevRecords.filter((prevRecord) => prevRecord.id !== inputData.id)
    );

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
