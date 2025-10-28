import { login, register } from '@/api/auth';
import { setApiAuthHeader } from '@/api/client';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useContext, useEffect, useState } from 'react';

type LoginData = {
    email: string;
    password: string;
};

type RegisterData = {
    email: string;
    password: string;
    password_confirmation: string;
};

type AuthContextType = {
    isLoggedIn: boolean;
    loading: boolean;
    loginUser: (loginData: LoginData) => void;
    registerUser: (registerData: RegisterData) => void;
    logoutUser: () => void;
};

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTokenFromStorage = async () => {
            try {
                const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);

                if (accessToken) {
                    setApiAuthHeader(accessToken);
                    setIsLoggedIn(true);
                }

            } catch (e) {
                console.error("Failed to load auth token from storage", e);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        loadTokenFromStorage();
    }, []);

    const loginUser = async (loginData: LoginData) => {
        try {
            const response = await login(loginData.email, loginData.password);
            const { access, refresh } = response.data;
            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, access);
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refresh);
            setApiAuthHeader(access);
            setIsLoggedIn(true);
            return response;
        } catch (error) {
            throw error;
        }
    }

    const registerUser = async (registerData: RegisterData) => {
        try {
            const response = await register(registerData.email, registerData.password, registerData.password_confirmation);
            return response;
        } catch (error) {
            throw error;
        }
    }

    const logoutUser = async () => {
        try {
            await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
            await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
            setIsLoggedIn(false);
            setApiAuthHeader(null);
            router.replace('/(auth)/login');
        } catch (e) {
            console.error("Failed to log out", e);
        }
    }
    return (
        <AuthContext.Provider value={{ isLoggedIn, loading, loginUser, registerUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const useContextResult = useContext(AuthContext);
    if (!useContextResult) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return useContextResult;
};