import { login, register } from '@/api/auth';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';

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
    loginUser: (loginData: LoginData) => void;
    registerUser: (registerData: RegisterData) => void;
    logoutUser: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginUser = async (loginData: LoginData) => {
        try {
            const response = await login(loginData.email, loginData.password);
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

    const logoutUser = () => {
        setIsLoggedIn(false);
        router.replace('/login');
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, loginUser, registerUser, logoutUser }}>
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