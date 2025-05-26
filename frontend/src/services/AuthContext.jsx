import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login, getCurrentUser, logout as apiLogout } from './authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginUser = useCallback(async (credentials) => {
        try {
            await login(credentials);
            const userData = await getCurrentUser();
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
            console.error('Login failed', err);
            throw err;
        }
    }, []);

    const logoutUser = useCallback(async () => {
        try {
            await apiLogout();
        } catch (err) {
            console.error('Logout failed', err);
        } finally {
            localStorage.removeItem('user');
            setUser(null);
        }
    }, []);

    const restoreSession = useCallback(async () => {
        try {
            const userData = await getCurrentUser();
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch {
            setUser(null);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void restoreSession(); // avoid ESLint warning for async in useEffect
    }, [restoreSession]);

    const value = {
        user,
        loginUser,
        logoutUser,
        loading,
        isAuthenticated: Boolean(user),
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
    };

    export const useAuth = () => {
        const context = useContext(AuthContext);
        if (!context) {
            throw new Error('useAuth must be used within an AuthProvider');
        }
    return context;
};
