import { createBrowserRouter } from "react-router";
// import ErrorBoundary from "./components/ErrorBoundary";
import AppLayout from "@/layout/app-layout";
import NotFound from "@/components/not-found";
import Home from "@/pages/home";
import ProductListingPage from "@/pages/productListingPage";
import ProductDetailsPage from "@/pages/productDetailsPage";
import CartPage from "@/pages/cartPage";
import Account from "@/pages/account";

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
      {
        path: "/product/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
