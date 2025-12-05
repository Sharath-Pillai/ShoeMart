import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-cyan-600">ShoeMart Admin</h1>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <Link
            to="/admin"
            className={`block px-4 py-2 rounded-lg transition ${
              isActive("/admin")
                ? "bg-cyan-50 text-cyan-700 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className={`block px-4 py-2 rounded-lg transition ${
              isActive("/admin/products")
                ? "bg-cyan-50 text-cyan-700 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Products
          </Link>
          <Link
            to="/admin/users"
            className={`block px-4 py-2 rounded-lg transition ${
              isActive("/admin/users")
                ? "bg-cyan-50 text-cyan-700 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Users
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t bg-gray-50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm py-4 px-8 border-b flex justify-end items-center">
             <span className="text-gray-700 font-medium">Hi {user?.firstName || user?.username || "Admin"}</span>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
