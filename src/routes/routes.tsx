import { createBrowserRouter } from "react-router";
// import ErrorBoundary from "./components/ErrorBoundary";
import AppLayout from "@/layout/app-layout";
import NotFound from "@/components/not-found";
import Home from "@/pages/home";
import ProductListingPage from "@/pages/productListingPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    // errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product-listing",
        element: <ProductListingPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
