import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminSignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const signUpHandler = async () => {
    let newError = {};

    // Name validation
    if (name === "") {
      newError.name = "Full name is required";
    }

    // Email validation
    if (email === "") {
      newError.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newError.email = "Email is invalid";
    }

    // Password validation
    if (password === "") {
      newError.password = "Password is required";
    } else if (password.length < 8) {
      newError.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (confirmPassword === "") {
      newError.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }

    // Invitation code validation
    if (invitationCode === "") {
      newError.invitationCode = "Admin invitation code is required";
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      try {
        setLoading(true);

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/admin/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            password,
            invitationCode,
          })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          const user = data.user;
          const token = data.token;

          // Store token and user
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          // Auto-login
          login(user);
          setSuccess(true);

          setTimeout(() => {
            alert("Admin account created successfully!");
            const userParam = encodeURIComponent(JSON.stringify(user));
            const tokenParam = encodeURIComponent(token);
            window.location.href = `https://shoe-mart-admin.vercel.app/admin?user=${userParam}&token=${tokenParam}`;
          }, 1500);
        } else {
          setError({ general: data.message || "Failed to create admin account" });
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
      signUpHandler();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Admin Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <span className="text-3xl">📋</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Request Admin Access
          </h1>
          <p className="text-gray-600">
            Create your admin account to manage the store
          </p>
        </div>

        {/* Sign Up Form Container */}
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-blue-100">
          {/* Error Message */}
          {error.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm flex items-start">
              <span className="mr-2">⚠️</span>
              <span>{error.general}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm flex items-start">
              <span className="mr-2">✅</span>
              <span>Account created! Redirecting to dashboard...</span>
            </div>
          )}

          {/* Full Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="John Doe"
              className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-colors ${
                error.name
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-blue-200 focus:border-blue-500"
              }`}
            />
            {error.name && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <span className="mr-1">✕</span> {error.name}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="admin@company.com"
              className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-colors ${
                error.email
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-blue-200 focus:border-blue-500"
              }`}
            />
            {error.email && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <span className="mr-1">✕</span> {error.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
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
                    : "border-gray-200 hover:border-blue-200 focus:border-blue-500"
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

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="••••••••"
                className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-colors pr-12 ${
                  error.confirmPassword
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 hover:border-blue-200 focus:border-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {error.confirmPassword && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <span className="mr-1">✕</span> {error.confirmPassword}
              </p>
            )}
          </div>

          {/* Invitation Code Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Admin Invitation Code
            </label>
            <input
              type="password"
              value={invitationCode}
              onChange={(e) => setInvitationCode(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter invitation code"
              className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-colors ${
                error.invitationCode
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:border-blue-200 focus:border-blue-500"
              }`}
            />
            {error.invitationCode && (
              <p className="text-red-600 text-xs mt-1 flex items-center">
                <span className="mr-1">✕</span> {error.invitationCode}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              💡 You need an invitation code from an existing admin to create an
              account
            </p>
          </div>

          {/* Sign Up Button */}
          <button
            onClick={signUpHandler}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 rounded-lg transition-all duration-300 mb-4 flex items-center justify-center"
          >
            {loading ? (
              <>
                <span className="inline-block animate-spin mr-2">⏳</span>
                Creating Account...
              </>
            ) : (
              <>
                <span className="mr-2">✨</span>
                Create Admin Account
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-gray-500">OR</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Already have admin access?
              <Link
                to="/admin/signin"
                className="text-blue-600 hover:text-blue-800 font-semibold ml-1"
              >
                Sign In Here
              </Link>
            </p>
          </div>

          {/* Back to User Sign Up */}
          <div className="text-center pt-4 border-t border-gray-100 mt-4">
            <p className="text-gray-600 text-sm">
              Looking for regular signup?
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-800 font-semibold ml-1"
              >
                User Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-xs text-blue-700 mb-2">
            <span className="font-semibold">ℹ️ Admin Requirements:</span>
          </p>
          <ul className="text-xs text-blue-600 space-y-1 ml-4">
            <li>✓ Minimum 8 character password</li>
            <li>✓ Valid email address</li>
            <li>✓ Valid invitation code from existing admin</li>
            <li>✓ Full name required</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUpPage;
