import "./App.css";
import { RouterProvider } from "react-router";
import routes from "./routes/routes";
import ReduxProvider from "./components/provider/reduxProvider";
import SessionProvider from "./components/provider/sessionProvider";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <ReduxProvider>
        <SessionProvider>
          <RouterProvider router={routes} />
          <Toaster />
        </SessionProvider>
      </ReduxProvider>
    </>
  );
}

export default App;
