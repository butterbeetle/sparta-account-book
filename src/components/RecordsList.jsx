import { Link } from "react-router-dom";
import styled from "styled-components";
import formatAmount from "../utils/formatAmount";

const RecordsListMainDiv = styled.div`
  padding: 8px;
  background-color: #cbd5e1;
`;

const ListUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid gray;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
`;

const ContentDiv = styled.div`
  display: flex;
  position: relative;
  flex: 1;
  flex-direction: column;
  gap: 8px;
`;

const DateParagraph = styled.p`
  color: gray;
  font-size: 1rem;
  font-weight: bold;
`;

const CategoryDiv = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: bold;
  color: #3c98fd;
  width: fit-content;
  max-width: 300px;
`;

const ContentParagraph = styled.p`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AmountParagraph = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #3c98fd;
`;

export default function RecordsList({ selectedMonth, recordsData }) {
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
                  {category} - <ContentParagraph>{content}</ContentParagraph>
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
