import apiClient from "@/api/client";

const register = async (email: string, password: string, password_confirmation: string) => {
    return await apiClient.post('accounts/register/', {
        'email': email,
        'password': password,
        'password_confirmation': password_confirmation,
    });
};

const login = async (email: string, password: string) => {
    return await apiClient.post('token/', {
        'email': email,
        'password': password
    });
};


export { login, register };

