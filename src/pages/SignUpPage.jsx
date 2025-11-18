import React from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
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
              />
            </div>

            <div>
              <label htmlFor="firstName" className="text-sm font-semibold">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="border border-gray-300  p-2 w-full rounded-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="firstName" className="text-sm font-semibold">
              E-mail
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300  p-2 w-full  rounded-sm"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="firstName" className="text-sm font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="border border-gray-300  p-2 w-full  rounded-sm"
              />
              {/* Eye icon (visible) */}
              <div className="absolute right-3 top-2.5 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              {/* eye closed icon  */}
              <div className="absolute right-3 top-2.5 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18M10.477 10.477A3 3 0 0112 9c.828 0 1.578.336 2.121.879M9.88 9.879A3 3 0 0012 15c.828 0 1.578-.336 2.121-.879M2.458 12C3.732 7.943 7.523 5 12 5c1.794 0 3.465.479 4.9 1.318M19.542 17.683C18.147 19.02 15.842 20 12 20c-4.477 0-8.268-2.943-9.542-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="firstName" className="text-sm font-semibold">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm your password"
                className="border border-gray-300  p-2 w-full  rounded-sm"
              />
              {/* Eye icon (visible) */}
              <div className="absolute right-3 top-2.5 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              {/* eye closed icon  */}
              <div className="absolute right-3 top-2.5 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18M10.477 10.477A3 3 0 0112 9c.828 0 1.578.336 2.121.879M9.88 9.879A3 3 0 0012 15c.828 0 1.578-.336 2.121-.879M2.458 12C3.732 7.943 7.523 5 12 5c1.794 0 3.465.479 4.9 1.318M19.542 17.683C18.147 19.02 15.842 20 12 20c-4.477 0-8.268-2.943-9.542-7"
                  />
                </svg>
              </div>
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
                type="text"
                placeholder="+974 77XXXXXX"
                className="border border-gray-300 rounded-l-sm p-2 grow"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-sm transition-colors duration-300">
                Verify
              </button>
            </div>
          </div>

          <div className="flex items-center mt-4">
            <input type="checkbox" id="recaptcha" className="mr-2" />
            <label htmlFor="recaptcha" className="text-sm text-gray-600">
              I'm not a robot
            </label>
          </div>
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

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-sm mt-6 transition-colors duration-300">
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

          <Link to="/signin" className="w-full bg-white-600 border-violet-300 border-2 hover:bg-blue-700 hover:border-white hover:text-white font-medium py-2 rounded-sm mt-6 transition-colors duration-300">
            Sign In Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
