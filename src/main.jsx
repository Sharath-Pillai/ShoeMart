import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
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
import { ShoeProvider } from "./context/shoeContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: ErrorPage,
    children: [
      {
        path: "/signup",
        Component: SignUpPage,
      },
      {
        path: "/signin",
        Component: SignInPage,
      },
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/about",
        Component: AboutPage,
      },
      {
        path: "/allcollections",
        Component: AllCollectionPage,
      },
      {
        path: "/womenshoelist",
        Component: WomenshoePage,
      },
      {
        path: "/menshoelist",
        Component: MenshoePage,
      },
      {
        path: "/productdetails/:id",
        Component: ProductPage,
      },
      {
        path: "/wishlist",
        Component: WishlistPage,
      },
      {
        path: "/cart",
        Component: CartPage,
      },
      {
        path: "/contact",
        Component: ContactPage,
      },
      {
        path: "/checkout",
        Component: CheckoutPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ShoeProvider>
    <RouterProvider router={router} />
  </ShoeProvider>
);
