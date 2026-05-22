import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Synchronously initialize the user state to avoid race conditions with routing
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const userParam = params.get("user");
      const tokenParam = params.get("token");

      if (userParam && tokenParam) {
        try {
          // Robustly decode and parse the user data
          let userData;
          try {
            userData = JSON.parse(userParam);
          } catch (e) {
            userData = JSON.parse(decodeURIComponent(userParam));
          }
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("token", tokenParam);
          return userData;
        } catch (err) {
          console.error("Failed to parse user from URL parameters:", err);
        }
      }

      // Fallback to localStorage if no URL params are present
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          return JSON.parse(storedUser);
        } catch (err) {
          console.error("Failed to parse stored user from localStorage:", err);
        }
      }
    }
    return null;
  });

  // Synchronously initialize loading state
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const userParam = params.get("user");
      const tokenParam = params.get("token");
      if (userParam && tokenParam) {
        return false;
      }
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    // Clean the URL query parameters after successful extraction to keep it clean
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const userParam = params.get("user");
      const tokenParam = params.get("token");

      if (userParam && tokenParam) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

