import apiClient from "@/api/client";

const register = async (email: string, password: string, password_confirmation: string) => {
    return await apiClient.post('accounts/register/', {
        'email': email,
        'password': password,
        'password_confirmation': password_confirmation,
    });
};

const whoami = async () => {
    return await apiClient.get('accounts/whoami/');
}

const login = async (email: string, password: string) => {
    return await apiClient.post('token/', {
        'email': email,
        'password': password
    });
};

const refreshToken = async (refresh: string) => {
    return await apiClient.post('token/refresh/', {
        'refresh': refresh
    });
}

const verifyAccount = async (verificationCode: string) => {
    return await apiClient.post('accounts/verify/confirm/', {
        'verification_code': verificationCode,
    });
}

const resendVerificationCode = async (email: string) => {
    return await apiClient.post('accounts/verify/resend/', {
        'email': email,
    });
}

const requestPasswordReset = async (email: string) => {
    return await apiClient.post('accounts/password-reset/request/', {
        'email': email,
    });
};

const confirmPasswordReset = async (resetCode: string, newPassword: string, newPasswordConfirmation: string) => {
    return await apiClient.post('accounts/password-reset/confirm/', {
        'verification_code': resetCode,
        'new_password': newPassword,
        'new_password_confirmation': newPasswordConfirmation,
    })
};

export { confirmPasswordReset, login, refreshToken, register, requestPasswordReset, resendVerificationCode, verifyAccount, whoami };

