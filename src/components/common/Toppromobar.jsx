import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Toppromobar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"/></svg> Free Shipping</span>
              <span className="flex items-center gap-2">Click & Collect</span>
              <span className="flex items-center gap-2">Home Delivery</span>
            </div>
            <div className="text-right flex items-center gap-4">
              <span className="mr-4">Deliver to <strong>Alappuzha</strong></span>
              {user ? (
                <div className="flex items-center gap-2">
                   <span className="text-yellow-600 font-semibold">Hi, {user.firstName || user.username}</span>
                   {(user.role === 'admin' || user.role === 'super-admin') && <Link to="/admin" className="text-blue-600 hover:underline">Admin Panel</Link>}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Toppromobar;
