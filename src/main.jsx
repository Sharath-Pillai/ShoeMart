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
import ProfilePage from "./pages/ProfilePage.jsx";
import { ShoeProvider } from "./context/shoeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import AdminRoute from "./components/admin/AdminRoute.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";

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
        path: "/cart",
        Component: CartPage,
        handle: { showHeader: false },
      },
      {
        path: "/contact",
        Component: ContactPage,
        handle: { showHeader: false },
      },
      {
        path: "/checkout",
        Component: CheckoutPage,
        handle: { showHeader: true },
      },
      {
        path: "/tracking",
        Component: TrackingPage,
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
  {
    path: "/admin",
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "products", element: <AdminProducts /> },
          { path: "users", element: <AdminUsers /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ShoeProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ShoeProvider>
    </AuthProvider>
  </StrictMode>
);
