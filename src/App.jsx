import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RecordDetailPage from "./pages/RecordDetailPage/RecordDetailPage";

export default function App() {
  const [data, setData] = useState([]);
  console.log(data);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage data={data} setData={setData} />} />
        <Route path="/records/:recordId" element={<RecordDetailPage />} />
      </Routes>
    </BrowserRouter>
  );

  // return <RouterProvider router={router} />
}
