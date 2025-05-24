import { createContext, useContext, useState, useEffect } from 'react';
import { login, getCurrentUser, logout as apiLogout } from './authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginUser = async (credentials) => {
        await login(credentials);
        const userData = await getCurrentUser();
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logoutUser = async () => {
        await apiLogout();
        localStorage.removeItem('user');
        setUser(null);
    };

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

        // Validasi session dengan backend (jika cookie/session digunakan)
        getCurrentUser()
            .then((userData) => {
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            })
            .catch(() => {
                setUser(null);
                localStorage.removeItem('user');
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
