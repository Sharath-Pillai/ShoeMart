import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isHuman, setIsHuman] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const signUpHandler = async () => {
    let newError = {};
    //firstanme validation
    if (firstName === "") {
      newError.firstName = "First Name is required";
    }
    //lastname validation
    if (lastName === "") {
      newError.lastName = "Last Name is required";
    }
    // email validation
    if (email === "") {
      newError.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newError.email = "Email is invalid";
    }

    // password validation
    if (password === "") {
      newError.password = "Password is Required";
    } else if (password.length < 8) {
      newError.password = "Password must be at least 8 characters";
    }

    // confirm password validation
    if (confirmPassword === "") {
      newError.confirmPassword = "Confirm Password is Required";
    } else if (password !== confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }
    //moble number validation
    if (mobileNumber === "") {
      newError.mobileNumber = "Mobile Number is Required";
    } 
    //iam not robot validation
    if (!isHuman) {
      newError.isHuman = "Please verify that you are not a robot";
    }

    setError(newError);

    if (Object.keys(newError).length === 0) {
      try {
        // Check if user already exists
        const checkRes = await fetch(`http://localhost:3000/users?email=${email}`);
        const existingUsers = await checkRes.json();

        if (existingUsers.length > 0) {
          setError({ email: "Email already registered" });
          return;
        }

        const newUser = {
          firstName,
          lastName,
          email,
          password, // In a real app, hash this!
          mobileNumber,
          role: "user",
          active: true
        };

        await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });

        alert("SignUp successfully! Please sign in.");
        navigate("/signin");
      } catch (err) {
        console.error(err);
        alert("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-lg bg-white shadow-lg rounded-2xl p-8 ">
        {/* Sign up form */}
        <div className="">
          <h1 className="text-2xl font-semibold text-center mb-2">
            Sign Up Now
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Enjoy the convenience of a single account across all participating
            brands.
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 mb-4 flex items-center rounded-sm transition-colors duration-300">
            <div className="w-6 h-6 ml-3">
              <img src="/E-commerce App/facebook-inverted-icon.svg" alt="" />
            </div>
            <span className="w-[full] ">Sign Up With Facebook</span>
          </button>

          <div className="flex items-center justify-center gap-3 mb-4">
            <hr className="border-gray-100 w-[36%]" />
            <p className="text-center text-gray-500 text-xs md:text-base ">
              OR VIA EMAIL
            </p>
            <hr className="border-gray-100 w-[36%]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="text-sm font-semibold">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="border border-gray-300  p-2 w-full rounded-sm"
                onChange={(e) => setFirstName(e.target.value)}
              />
              {error.firstName && (
                <p className="text-sm text-red-400">{error.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="firstName" className="text-sm font-semibold">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="border border-gray-300  p-2 w-full rounded-sm"
                onChange={(e) => setLastName(e.target.value)}
              />
              {error.lastName && (
                <p className="text-sm text-red-400">{error.lastName}</p>
              )}
            </div>
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

          <div className="mt-4">
            <label htmlFor="firstName" className="text-sm font-semibold">
              Confirm Password
            </label>
            <div className="relative">
              <input
                value={confirmPassword}
                type="password"
                placeholder="Confirm your password"
                className="border border-gray-300  p-2 w-full  rounded-sm"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error.confirmPassword && (
                <p className="text-sm text-red-400">{error.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold ">
              Mobile{" "}
              <span className="text-sm text-gray-500">
                (We’ll send you a verification code)
              </span>
            </label>
            <div className="flex">
              <input
                value={mobileNumber}
                type="text"
                placeholder="+974 77XXXXXX"
                className="border border-gray-300 rounded-l-sm p-2 grow"
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-sm transition-colors duration-300">
                Verify
              </button>
            </div>
            {error.mobileNumber && (
              <p className="text-sm text-red-400">{error.mobileNumber}</p>
            )}
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="recaptcha"
              className="mr-2"
              onChange={(e) => setIsHuman(e.target.checked)}
            />
            <label htmlFor="recaptcha" className="text-sm text-gray-600">
              I'm not a robot
            </label>
          </div>
          {error.isHuman && (
            <p className="text-sm text-red-400">{error.isHuman}</p>
          )}
          <div className="mt-4">
            <label className="text-sm font-semibold ">
              Date of Birth{" "}
              <span className="text-sm text-gray-500">(optional)</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <select className="border border-gray-300 rounded-sm p-2 text-xs font-semibold">
                <option>Date</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
              </select>
              <select className="border border-gray-200 rounded-sm p-2 text-xs font-semibold">
                <option>Month</option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label className="flex items-center text-sm text-gray-700">
              <input type="checkbox" className="mr-2" />
              Send me the latest offers and updates from Shoe Mart brands.
            </label>

            <label className="flex items-center text-sm text-gray-700">
              <input type="checkbox" className="mr-2" />I consent to the
              processing of my personal information.
            </label>
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-sm mt-6 transition-colors duration-300"
            onClick={signUpHandler}
          >
            Sign Up
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            By signing up, you agree to join the Shukran loyalty programme and
            accept our{" "}
            <span className="text-blue-600 cursor-pointer">
              Terms and Conditions
            </span>
            .
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <hr className="border-gray-200 w-[22%]" />
            <p className="text-center text-gray-500 text-xs md:text-sm ">
              ALREADY HAVE AN ACCOUNT?
            </p>
            <hr className="border-gray-200 w-[22%]" />
          </div>

          <Link
            to="/signin"
            className="w-full inline-block text-center bg-white-600 border-violet-300 border-2 hover:bg-blue-700 hover:border-white hover:text-white font-medium py-2 rounded-sm mt-6 transition-colors duration-300"
          >
            Sign In Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
