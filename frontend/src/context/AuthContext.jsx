import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userParam = params.get('user');
        const tokenParam = params.get('token');

        if (userParam && tokenParam) {
            try {
                const userData = JSON.parse(userParam);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('token', tokenParam);
                
                // Clean the URL
                window.history.replaceState({}, document.title, window.location.pathname);
                
                setUser(userData);
                setLoading(false);
                return;
            } catch (err) {
                console.error("Failed to parse user from URL", err);
            }
        }

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
