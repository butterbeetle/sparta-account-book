import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import formatAmount from "../utils/formatAmount";
import getRandomHexCode from "../utils/getRandomHexCode";

const ColorDiv = styled.div`
  width: ${(props) => props.$width}%;
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
      <div className="flex w-full h-[60px]">
        {Object.values(categoryRecordsData).map(({ amount, bgColor }) => (
          <ColorDiv
            key={uuidv4()}
            $width={((amount / totalAmount) * 100).toFixed(2)}
            $bgColor={bgColor}
          ></ColorDiv>
        ))}
      </div>
      <div>하이 HI</div>
    </div>
  );
}
