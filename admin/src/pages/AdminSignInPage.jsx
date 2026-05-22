// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const AdminSignInPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState({});
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const signInHandler = async () => {
//     let newError = {};

//     if (email === "") {
//       newError.email = "Email is required";
//     }

//     if (password === "") {
//       newError.password = "Password is Required";
//     }

//     setError(newError);

//     if (Object.keys(newError).length === 0) {
//       try {
//         setLoading(true);

//         const response = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL}/api/user/admin/login`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email, password }),
//           },
//         );

//         const data = await response.json();

//         if (response.ok && data.success) {
//           const user = data.user;
//           const token = data.token;

//           localStorage.setItem("token", token);
//           localStorage.setItem("user", JSON.stringify(user));

//           login(user);
//           alert("Admin SignIn successful!");
//           navigate("/admin", { replace: true });
//         } else if (response.status === 403) {
//           setError({
//             general:
//               "⛔ Your account has been blocked. Please contact support.",
//           });
//         } else {
//           setError({ general: data.message || "Invalid email or password" });
//         }
//       } catch (err) {
//         setError({ general: "Something went wrong. Please try again." });
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="max-w-md bg-white shadow-lg rounded-2xl p-8">
//         <h1 className="text-3xl font-bold text-center mb-2">Admin Login</h1>
//         <p className="text-gray-600 text-center mb-6">
//           Sign in to your admin dashboard
//         </p>

//         {error.general && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//             <span className="block sm:inline">{error.general}</span>
//           </div>
//         )}

//         <div className="mt-6">
//           <label htmlFor="email" className="text-sm font-semibold block mb-2">
//             Email
//           </label>
//           <input
//             id="email"
//             value={email}
//             type="email"
//             placeholder="Enter your admin email"
//             className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:border-blue-500"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {error.email && (
//             <p className="text-sm text-red-400 mt-1">{error.email}</p>
//           )}
//         </div>

//         <div className="mt-4">
//           <label
//             htmlFor="password"
//             className="text-sm font-semibold block mb-2"
//           >
//             Password
//           </label>
//           <div className="relative">
//             <input
//               id="password"
//               value={password}
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:border-blue-500"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
//             >
//               {showPassword ? "Hide" : "Show"}
//             </button>
//           </div>
//           {error.password && (
//             <p className="text-sm text-red-400 mt-1">{error.password}</p>
//           )}
//         </div>

//         <button
//           onClick={signInHandler}
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-6 transition-colors duration-300 disabled:opacity-50"
//         >
//           {loading ? "Signing In..." : "Sign In"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSignInPage;
