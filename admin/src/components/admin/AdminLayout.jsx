import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../frontend/src/context/AuthContext.jsx";
import { useState } from "react";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`w-64 md:w-72 bg-slate-900 shadow-2xl flex flex-col absolute md:relative z-30 h-full transition-transform duration-300 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 md:p-8 border-b border-slate-800 flex items-center justify-between md:justify-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-cyan-400 tracking-wider uppercase drop-shadow-md">Admin<span className="text-white">Pro</span></h1>
          <button className="md:hidden text-white font-bold text-xl" onClick={() => setIsMobileOpen(false)}>✕</button>
        </div>
        <nav className="mt-8 px-4 flex-1 space-y-3 overflow-y-auto">
          <Link
            to="/admin"
            onClick={() => setIsMobileOpen(false)}
            className={`block px-6 py-3 rounded-xl transition-all duration-300 font-medium tracking-wide ${
              isActive("/admin")
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            onClick={() => setIsMobileOpen(false)}
            className={`block px-6 py-3 rounded-xl transition-all duration-300 font-medium tracking-wide ${
              isActive("/admin/products")
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            Products
          </Link>
          <Link
            to="/admin/users"
            onClick={() => setIsMobileOpen(false)}
            className={`block px-6 py-3 rounded-xl transition-all duration-300 font-medium tracking-wide ${
              isActive("/admin/users")
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            Users
          </Link>
          <Link
            to="/admin/orders"
            onClick={() => setIsMobileOpen(false)}
            className={`block px-6 py-3 rounded-xl transition-all duration-300 font-medium tracking-wide ${
              isActive("/admin/orders")
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            Orders
          </Link>
        </nav>
        <div className="p-6 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-bold text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            Logout Securely
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="bg-white shadow-sm py-4 md:py-5 px-6 md:px-10 flex justify-between items-center z-10 border-b border-gray-100">
             <div className="flex items-center gap-4">
                <button className="md:hidden text-slate-600 text-2xl font-bold" onClick={() => setIsMobileOpen(true)}>
                  ☰
                </button>
                <div className="text-slate-500 font-medium hidden sm:block">Welcome back!</div>
             </div>
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 font-bold shadow-inner">
                  {(user?.firstName || user?.username || "A")[0].toUpperCase()}
               </div>
               <span className="text-slate-800 font-bold tracking-wide hidden sm:block">{user?.firstName || user?.username || "Admin"}</span>
             </div>
        </header>
        <main className="flex-1 p-4 md:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
