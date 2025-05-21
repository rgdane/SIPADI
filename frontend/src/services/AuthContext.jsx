import { createContext, useContext, useState, useEffect } from 'react';
import { login, getCurrentUser, logout as apiLogout } from './authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginUser = async (credentials) => {
        await login(credentials);
        const userData = await getCurrentUser();
        setUser(userData);
    };

    const logoutUser = async () => {
        await apiLogout();
        setUser(null);
    };

    useEffect(() => {
        getCurrentUser()
            .then(setUser)
            .catch(() => setUser(null)); // Biar tetap null kalau unauthorized
    }, []);

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
