import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import formatAmount from "../utils/formatAmount";
import getRandomHexCode from "../utils/getRandomHexCode";

const ColorDiv = styled.div`
  width: ${(props) => props.$width};
  height: 16px;
  background-color: ${(props) => props.$bgColor};
`;

export default function TotalOutlay({ selectedMonth, recordsData }) {
  const filteredRecordsData = recordsData.filter(
    ({ date }) => +date.split("-")[1] === +selectedMonth
  );

  const totalAmount = filteredRecordsData.reduce(
    (acc, cur) => acc + +cur.amount,
    0
  );

  const categoryRecordsData = filteredRecordsData.reduce(
    (acc, { category, amount }) => {
      if (acc[category]) {
        acc[category].amount += amount;
      } else {
        acc[category] = { amount, bgColor: getRandomHexCode() };
      }
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-col p-2 items-center">
      <h1>
        {selectedMonth}월 총 지출:{formatAmount(totalAmount)}
      </h1>
      <div className="flex w-full h-[20px]">
        {Object.values(categoryRecordsData).map(({ amount, bgColor }) => (
          <ColorDiv
            key={uuidv4()}
            $width={`${((amount / totalAmount) * 100).toFixed(2)}%`}
            $bgColor={bgColor}
          ></ColorDiv>
        ))}
      </div>
      <div className="w-full flex flex-col items-start justify-center gap-1">
        {Object.keys(categoryRecordsData).map((category) => (
          <div
            key={uuidv4()}
            className="w-full flex items-center justify-between border-b-2 border-solid border-b-black "
          >
            <div className="flex flex-1">
              <ColorDiv
                $width={`16px`}
                $bgColor={categoryRecordsData[category]["bgColor"]}
              ></ColorDiv>
              <div className="flex-1">{category}</div>
            </div>
            <div className="flex-1 text-end">
              {formatAmount(categoryRecordsData[category]["amount"])}
            </div>
            <div className="flex-1 text-end">
              {(
                (categoryRecordsData[category]["amount"] / totalAmount) *
                100
              ).toFixed(2)}
              %
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
