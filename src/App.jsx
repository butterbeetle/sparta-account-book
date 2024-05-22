import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import RecordDetailPage from "./pages/RecordDetailPage/RecordDetailPage";
import formatDate from "./utils/formatDate";

const GlobalStyle = createGlobalStyle`
  * {
  font-family: "Neue Haas Grotesk Display Pro", sans-serif;
}
html,
body {
  height: 100%;
  background-color: #eff2f7;
}

body > #root > div {
  height: 100%;
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  font-family: Arial, Helvetica, sans-serif;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

input:focus {
  outline: none;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;
}

`;

const DUMMY_DATA = [
  {
    id: "25600f72-56b4-41a7-a9c2-47358580e2f8",
    date: "2024-01-05",
    category: "식비",
    amount: 100000,
    content: "세광양대창",
  },
  {
    id: "25600f72-53b4-4187-a9c2-47358580e2f8",
    date: "2024-01-10",
    category: "도서",
    amount: 40500,
    content: "모던 자바스크립트",
  },
  {
    id: "24310f72-56b4-41a7-a9c2-458580ef1f8",
    date: "2024-02-02",
    category: "식비",
    amount: 50000,
    content: "회식",
  },
  {
    id: "25600f72-99b4-41z7-e4h6-47312365e2f8",
    date: "2024-02-02",
    category: "간식",
    amount: 500,
    content: "아이스크림",
  },
  {
    id: "25143e72-16e2-22a7-a9c2-47358580e2f8",
    date: "2024-02-02",
    category: "여행",
    amount: 1055000,
    content: "일본여행",
  },
  {
    id: "25600f72-97p2-14a7-a9c2-47363950e2t8",
    date: "2024-02-02",
    category: "미용",
    amount: 155000,
    content: "미용실",
  },
  {
    id: "24312f70-97q2-14a7-a9c2-47132950e2t8",
    date: "2024-02-02",
    category: "도서",
    amount: 75000,
    content:
      "자율주행차량 운전주행모드 자동 전환용 인식률 90% 이상의 다중 센서 기반 운전자 상태 인식 및 상황 인식 원천 기술 개발",
  },
];

export default function App() {
  const [recordsData, setRecordsData] = useState(DUMMY_DATA);
  const [selectedMonth, setSelectedMonth] = useState(
    localStorage.getItem("selectedMonth") ?? +formatDate(new Date(), "month")
  );

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                recordsData={recordsData}
                setRecordsData={setRecordsData}
                selectedMonth={selectedMonth}
                setSelectedMonth={setSelectedMonth}
              />
            }
          />
          <Route
            path="/records/:recordId"
            element={
              <RecordDetailPage
                recordsData={recordsData}
                setRecordsData={setRecordsData}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );

  // return <RouterProvider router={router} />
}
