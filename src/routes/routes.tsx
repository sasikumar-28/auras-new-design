import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";

import { ErrorBoundary } from "@/components/errorBoundary";
const AppLayout = lazy(() => import("@/layout/app-layout"));
const NotFound = lazy(() => import("@/components/not-found"));
const Home = lazy(() => import("@/pages/home"));
const ProductListingPage = lazy(() => import("@/pages/productListingPage"));
const ProductDetailsPage = lazy(() => import("@/pages/productDetailsPage"));
const CartPage = lazy(() => import("@/pages/cartPage"));
//const Account = lazy(() => import("@/pages/account/Account"));
const Login = lazy(() => import("@/pages/loginPage/Login"));
const SignUp = lazy(() => import("@/pages/signUp"));
const Checkout = lazy(() => import("@/pages/checkout"));

const withSuspense = (
  Component: React.LazyExoticComponent<() => JSX.Element>,
) => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    }
  >
    <Component />
  </Suspense>
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundary>{withSuspense(AppLayout)}</ErrorBoundary>,
    children: [
      {
        path: "/",
        element: <ErrorBoundary> {withSuspense(Home)}</ErrorBoundary>,
      },
      {
        path: "/product-listing",
        element: (
          <ErrorBoundary> {withSuspense(ProductListingPage)}</ErrorBoundary>
        ),
      },
      {
        path: "/product/:id",
        element: (
          <ErrorBoundary> {withSuspense(ProductDetailsPage)}</ErrorBoundary>
        ),
      },
      {
        path: "/cart",
        element: <ErrorBoundary> {withSuspense(CartPage)}</ErrorBoundary>,
      },
      // {
      //   path: "/account",
      //   element: <ErrorBoundary> {withSuspense(Account)}</ErrorBoundary>,
      // },
      {
        path: "/checkout",
        element: <ErrorBoundary> {withSuspense(Checkout)}</ErrorBoundary>,
      },
    ],
  },
  {
    path: "/login",
    element: <ErrorBoundary>{withSuspense(Login)}</ErrorBoundary>,
  },
  {
    path: "/SignUp",
    element: <ErrorBoundary> {withSuspense(SignUp)}</ErrorBoundary>,
  },
  {
    path: "*",
    element: <ErrorBoundary> {withSuspense(NotFound)}</ErrorBoundary>,
  },
]);

export default routes;
