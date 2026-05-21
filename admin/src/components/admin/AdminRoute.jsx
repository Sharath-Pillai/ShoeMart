import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../../frontend/src/context/AuthContext.jsx";

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(user);
  if (!user || (user.role !== "admin" && user.role !== "super-admin")) {
    window.location.href = "http://localhost:5173/admin/signin";
    return null;
  }

  return <Outlet />;
};

export default AdminRoute;
