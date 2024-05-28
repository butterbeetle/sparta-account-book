import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import formatAmount from "../utils/formatAmount";

const RecordsListMainDiv = styled.div`
  height: 100%;
  padding: 12px;
  background-color: #e2e8f0;
  border-radius: 16px;
`;

const ListUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 16px;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #575757;
    border-radius: 16px;
    border: 0 solid transparent;
    background-clip: content-box;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 16px;
  }
`;

const ListLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background-color: #fffafc;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 12px 14px;
    background-color: #d2dff0;
    border: 1px solid #acb0b6;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  color: #1f2937;
`;

const DateParagraph = styled.p`
  color: #6b7280;
  font-size: 1rem;
  font-weight: bold;
`;

const CategoryDiv = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: bold;
  color: #3c98fd;
  width: fit-content;
  max-width: 250px;
`;

const ContentParagraph = styled.p`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #3b82f6;
`;

const AmountParagraph = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #3b82f6;
`;

export default function RecordsList() {
  const { selectedMonth, recordsData } = useSelector((state) => state.record);

  const filteredRecordsData = recordsData
    .filter(({ date }) => +date.split("-")[1] === +selectedMonth)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <RecordsListMainDiv>
      <ListUl>
        {filteredRecordsData.map(({ id, date, category, amount, content }) => (
          <Link key={id} to={`/records/${id}`}>
            <ListLi>
              <ContentDiv>
                <DateParagraph>{date}</DateParagraph>
                <CategoryDiv>
                  {category}:<ContentParagraph>{content}</ContentParagraph>
                </CategoryDiv>
              </ContentDiv>
              <AmountParagraph>{formatAmount(+amount)}</AmountParagraph>
            </ListLi>
          </Link>
        ))}
        {!filteredRecordsData.length && <div>지출이 없습니다.</div>}
      </ListUl>
    </RecordsListMainDiv>
  );
}
