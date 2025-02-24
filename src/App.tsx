import "./App.css";
import { RouterProvider } from "react-router";
import routes from "./routes/routes";
import ReduxProvider from "./components/provider/reduxProvider";
import SessionProvider from "./components/provider/sessionProvider";
function App() {
  return (
    <>
      <ReduxProvider>
        <SessionProvider>
          <RouterProvider router={routes} />
        </SessionProvider>
      </ReduxProvider>
    </>
  );
}

export default App;
