import "./App.css";
import { RouterProvider } from "react-router";
import routes from "./routes/routes";
import ReduxProvider from "./components/provider/reduxProvider";
function App() {
  return (
    <>
      <ReduxProvider>
        <RouterProvider router={routes} />
      </ReduxProvider>
    </>
  );
}

export default App;
