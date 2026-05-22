import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminSignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const signInHandler = async () => {
    let newError = {};

    // Email validation
    if (email === "") {
      newError.email = "Email is required";
    }

    // Password validation
    if (password === "") {
      newError.password = "Password is Required";
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      try {
        setLoading(true);

        // Use admin login endpoint
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/admin/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          },
        );

        const data = await response.json();

        if (response.ok && data.success) {
          const user = data.user;
          const token = data.token;

          // Store token and user in localStorage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          // Login user
          login(user);

          alert("Admin Sign In successful!");

          // Redirect to admin dashboard with user data in URL params
          const userParam = encodeURIComponent(JSON.stringify(user));
          const tokenParam = encodeURIComponent(token);
          window.location.href = `https://shoe-mart-admin.vercel.app/?user=${userParam}&token=${tokenParam}`;
        } else {
          setError({ general: data.message || "Invalid email or password" });
        }
      } catch (err) {
        setError({ general: "Something went wrong. Please try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      signInHandler();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4">
      <div className="w-full max-w-md">
        {/* Admin Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600">Manage your store with confidence</p>
        </div>

        {/* Sign In Form Container */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-orange-100">
          {/* Error Message */}
          {error.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm flex items-start">
              <span className="mr-2">⚠️</span>
              <span>{error.general}</span>
            </div>
          )}

          {/* Email Input */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="admin@shoemart.com"
              className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-colors ${
                error.email
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-orange-200 focus:border-orange-500"
              }`}
            />
            {error.email && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <span className="mr-1">✕</span> {error.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="••••••••"
                className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-colors pr-12 ${
                  error.password
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 hover:border-orange-200 focus:border-orange-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {error.password && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <span className="mr-1">✕</span> {error.password}
              </p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            onClick={signInHandler}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 rounded-lg transition-all duration-300 mb-4 flex items-center justify-center"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin mr-2">⏳</span>
                Signing In...
              </>
            ) : (
              <>
                <span className="mr-2">🔓</span>
                Sign In as Admin
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-500">OR</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Sign Up Link */}
          <div className="text-center mb-4">
            <p className="text-gray-600 text-sm mb-2">
              Don't have admin access?
            </p>
            <Link
              to="/admin/signup"
              className="inline-block bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2 px-6 rounded-lg transition-colors border border-blue-200"
            >
              Request Admin Access
            </Link>
          </div>

          {/* Back to User Sign In */}
          <div className="text-center pt-4 border-t border-gray-100">
            <p className="text-gray-600 text-sm">
              Looking for regular sign in?
              <Link
                to="/signin"
                className="text-blue-600 hover:text-blue-800 font-semibold ml-1"
              >
                User Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
          <p className="text-xs text-orange-700 flex items-center justify-center">
            <span className="mr-2">🛡️</span>
            This area is restricted to authorized administrators only
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignInPage;
