import { useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import formatAmount from "../utils/formatAmount";
import getRandomHexCode from "../utils/getRandomHexCode";

const TotalOutlayDiv = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  padding: 8px;
  align-items: center;
`;
const TotalOutlayGraph = styled.div`
  display: flex;
  width: 100%;
  height: 20px;
`;
const TotalOutlayColorDiv = styled.div`
  width: ${(props) => props.$width};
  height: 16px;
  background-color: ${(props) => props.$bgColor};
`;
const TotalOutlayLegendDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;
const TotalOutlayLegend = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px;
  border-style: solid;
  border-color: black;
`;
const TotalOutlayLegendFlexDiv = styled.div`
  flex: 1 1 0%;
`;
const TotalOutlayLegendCategory = styled(TotalOutlayLegendFlexDiv)`
  display: flex;
`;
const TotalOutlayLegendText = styled(TotalOutlayLegendFlexDiv)`
  text-align: end;
`;

export default function TotalOutlay() {
  const { selectedMonth, recordsData } = useSelector((state) => state.record);

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
        acc[category].amount += +amount;
      } else {
        acc[category] = { amount: +amount, bgColor: getRandomHexCode() };
      }
      return acc;
    },
    {}
  );

  return (
    <TotalOutlayDiv>
      <h1>
        {selectedMonth}월 총 지출:{formatAmount(totalAmount)}
      </h1>
      <TotalOutlayGraph>
        {Object.values(categoryRecordsData).map(({ amount, bgColor }) => (
          <TotalOutlayColorDiv
            key={uuidv4()}
            $width={`${((amount / totalAmount) * 100).toFixed(2)}%`}
            $bgColor={bgColor}
          ></TotalOutlayColorDiv>
        ))}
      </TotalOutlayGraph>
      <TotalOutlayLegendDiv>
        {Object.keys(categoryRecordsData).map((category) => (
          <TotalOutlayLegend key={uuidv4()}>
            <TotalOutlayLegendCategory>
              <TotalOutlayColorDiv
                $width={`16px`}
                $bgColor={categoryRecordsData[category]["bgColor"]}
              ></TotalOutlayColorDiv>
              <TotalOutlayLegendCategory>{category}</TotalOutlayLegendCategory>
            </TotalOutlayLegendCategory>
            <TotalOutlayLegendText>
              {formatAmount(+categoryRecordsData[category]["amount"])}
            </TotalOutlayLegendText>
            <TotalOutlayLegendText>
              {(
                (categoryRecordsData[category]["amount"] / totalAmount) *
                100
              ).toFixed(2)}
              %
            </TotalOutlayLegendText>
          </TotalOutlayLegend>
        ))}
      </TotalOutlayLegendDiv>
    </TotalOutlayDiv>
  );
}
