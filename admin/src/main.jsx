import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminRoute from "./components/admin/AdminRoute.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminOrders from "./pages/AdminOrders.jsx";
import { AuthProvider } from "../../frontend/src/context/AuthContext.jsx";

import SignInPage from "../../frontend/src/pages/SignInPage.jsx";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin" replace />,
  },
  {
    path: "/signin",
    element: <SignInPage />,
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
          { path: "orders", element: <AdminOrders /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
