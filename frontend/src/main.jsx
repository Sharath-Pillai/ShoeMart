import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import AllCollectionPage from "./pages/AllCollectionPage.jsx";
import WomenshoePage from "./pages/WomenshoePage.jsx";
import MenshoePage from "./pages/MenshoePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import TrackingPage from "./pages/TrackingPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import AdminSignInPage from "./pages/AdminSignInPage.jsx";
import AdminSignUpPage from "./pages/AdminSignUpPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import VerifyPage from "./pages/VerifyPage.jsx";


import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signup",
        Component: SignUpPage,
        handle: { showHeader: false },
      },
      {
        path: "/signin",
        Component: SignInPage,
        handle: { showHeader: false },
      },
      {
        path: "/admin/signin",
        Component: AdminSignInPage,
        handle: { showHeader: false },
      },
      {
        path: "/admin/signup",
        Component: AdminSignUpPage,
        handle: { showHeader: false },
      },
      {
        path: "/",
        Component: HomePage,
        handle: { showHeader: true },
      },
      {
        path: "/about",
        Component: AboutPage,
        handle: { showHeader: false },
      },
      {
        path: "/search",
        Component: SearchPage,
        handle: { showHeader: true },
      },
      {
        path: "/allcollections",
        Component: AllCollectionPage,
        handle: { showHeader: true },
      },
      {
        path: "/womenshoelist",
        Component: WomenshoePage,
        handle: { showHeader: true },
      },
      {
        path: "/menshoelist",
        Component: MenshoePage,
        handle: { showHeader: true },
      },
      {
        path: "/productdetails/:id",
        Component: ProductPage,
        handle: { showHeader: true },
      },
      {
        path: "/wishlist",
        Component: WishlistPage,
        handle: { showHeader: true },
      },
      {
        path: "/contact",
        Component: ContactPage,
        handle: { showHeader: false },
      },
      {
        path: "/tracking",
        Component: TrackingPage,
        handle: { showHeader: true },
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/cart",
            Component: CartPage,
            handle: { showHeader: false },
          },
          {
            path: "/checkout",
            Component: CheckoutPage,
            handle: { showHeader: true },
          },
          {
            path: "/verify",
            Component: VerifyPage,
            handle: { showHeader: true },
          },
          {
            path: "/profile",
            Component: ProfilePage,
            handle: { showHeader: true },
          },
          {
            path: "/orders",
            Component: OrderHistoryPage,
            handle: { showHeader: true },
          },
        ],
      },
    ],
  },
]);

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ShoeProvider } from "./context/shoeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <ShoeProvider>
          <RouterProvider router={router} />
        </ShoeProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
