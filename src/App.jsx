import { RouterProvider } from "react-router-dom";
import RecordContextProvider from "./context/RecordContext";
import router from "./routes/router";

export default function App() {
  return (
    <RecordContextProvider>
      <RouterProvider router={router} />;
    </RecordContextProvider>
  );
}
