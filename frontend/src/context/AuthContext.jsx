import React, { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../../Service/api'; // Import all api methods

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for session on load
        const checkSession = async () => {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                try {
                    const parsedUser = JSON.parse(savedUser);
                    setUser(parsedUser.user);
                    // Optionally verify token with backend here:
                    // const profile = await api.getProfile();
                    // setUser(profile.user);
                } catch (e) {
                    console.error("Failed to parse user session", e);
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };
        checkSession();
    }, []);

    const signIn = async (data) => {
        try {
            const response = await api.login(data);
            if (response.success) {
                const sessionData = { user: response.user, session: response.session };
                setUser(response.user);
                localStorage.setItem('user', JSON.stringify(sessionData));
                return { data: sessionData, error: null };
            }
        } catch (error) {
            return { data: null, error: error.response?.data?.message || error.message };
        }
    };

    const signUp = async (data) => {
        try {
            const response = await api.register(data);
            if (response.success) {
                const sessionData = { user: response.user, session: response.session };
                setUser(response.user);
                localStorage.setItem('user', JSON.stringify(sessionData));
                return { data: sessionData, error: null };
            }
        } catch (error) {
            return { data: null, error: error.response?.data?.message || error.message };
        }
    };

    const signOut = async () => {
        try {
            await api.logout(); // Optional: Tell backend to invalidate if needed
        } catch (e) {
            console.warn("Logout api failed", e);
        } finally {
            localStorage.removeItem('user');
            setUser(null);
        }
    };

    const value = {
        signUp,
        signIn,
        signOut,
        user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
