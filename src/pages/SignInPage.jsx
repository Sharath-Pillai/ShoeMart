import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [error, setError] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const signInHandler = async () => {
    let newError = {};
    // email validation
    if (email === "") {
      newError.email = "Email is required";
    } 

    // password validation
    if (password === "") {
      newError.password = "Password is Required";
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      try {
        const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
        const users = await res.json();

        if (users.length > 0) {
          const user = users[0];
          if (user.isBlocked || user.isActive === false) {
             setError({ general: "Your account has been blocked or deactivated. Please contact admin." });
             return;
          }
          login(user);
          alert("SignIn successfully!");
          if (user.role === 'admin') {
            navigate("/admin", { replace: true });
          } else {
            navigate(from, { replace: true });
          }
        } else {
          setError({ general: "Invalid email or password" });
        }
      } catch (err) {
        setError({ general: "Something went wrong. Please try again." });
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-lg bg-white shadow-lg rounded-2xl p-8 ">
        {/* Sign up form */}
        <div>
          <h1 className="text-2xl font-semibold text-center mb-2">
            Sign In Now
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Enjoy the convenience of a single account across all participating
            brands.
          </p>
          {error.general && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error.general}</span>
            </div>
          )}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 mb-4 flex items-center rounded-sm transition-colors duration-300">
            <div className="w-6 h-6 ml-3">
              <img src="/E-commerce App/facebook-inverted-icon.svg" alt="" />
            </div>
            <span className="w-[full] ">Sign In With Facebook</span>
          </button>

          <div className="flex items-center justify-center gap-3 mb-4">
            <hr className="border-gray-100 w-[36%]" />
            <p className="text-center text-gray-500 text-xs md:text-base ">
              OR VIA EMAIL
            </p>
            <hr className="border-gray-100 w-[36%]" />
          </div>

          <div className="mt-4">
            <label htmlFor="firstName" className="text-sm font-semibold">
              E-mail
            </label>
            <input
              value={email}
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300  p-2 w-full  rounded-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && (
              <p className="text-sm text-red-400">{error.email}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="firstName" className="text-sm font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="border border-gray-300  p-2 w-full  rounded-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error.password && (
                <p className="text-sm text-red-400">{error.password}</p>
              )}
              {/* Eye icon (visible) */}
              {showPassword ? (
                <div
                  onClick={() => setshowPassword(!showPassword)}
                  className="absolute right-2 top-0.5 cursor-pointer w-9 h-9"
                >
                  <img src="/show-password.png" alt="show" />
                </div>
              ) : (
                <div 
                  onClick={() => setshowPassword(!showPassword)}
                  className="absolute right-3 top-1.5 cursor-pointer w-7 h-7">
                  {" "}
                  {/* eye closed icon  */}
                  <img src="/hide-password.png" alt="hide" />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center mt-4 justify-between">
            <div>
              <input type="checkbox" id="recaptcha" className="mr-2" />
              <label
                htmlFor="recaptcha"
                className="text-sm text-black-600 font-semibold"
              >
                Remember Me
              </label>
            </div>
            <a href="" className="text-sm text-[#667eea] font-bold">
              Forgot Password
            </a>
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-sm mt-6 transition-colors duration-300"
            onClick={signInHandler}
          >
            Sign In
          </button>

          <div className="flex items-center justify-center gap-3 mt-4 mb-4">
            <hr className="border-gray-200 w-[22%]" />
            <p className="text-center text-gray-500 text-xs md:text-sm font-bold ">
              DON'T HAVE AN ACCOUNT?
            </p>
            <hr className="border-gray-200 w-[22%]" />
          </div>
          <Link
            to="/signup"
            className="inline-block w-full text-center bg-white-600 border-violet-300 border-2 hover:bg-blue-700 hover:border-white hover:text-white font-medium py-2 rounded-sm transition-colors duration-300"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
