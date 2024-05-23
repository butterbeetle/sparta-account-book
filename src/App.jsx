import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import RecordContextProvider from "./context/RecordContext";
import store from "./redux/store/store";
import router from "./routes/router";

export default function App() {
  return (
    <RecordContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </RecordContextProvider>
  );
}
