import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const baseURL = process.env.EXPO_PUBLIC_API_URL;

if (!baseURL) {
    throw new Error("EXPO_PUBLIC_API_URL is not defined in environment variables");
}

const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const handleDetailedError = (detail: any) => {
    if (Array.isArray(detail)) {
        return detail[0];
    } else if (typeof detail === 'string') {
        return detail;
    }
    return 'An error occurred';
}

export const setApiAuthHeader = (token: string | null) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

apiClient.interceptors.response.use(

    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            const status = error.response.status;

            if (status === 401 && !originalRequest._retry) {

                if (originalRequest.url.endsWith('/api/token/') || originalRequest.url.endsWith('/api/token/refresh/')) {
                    Toast.show({
                        type: 'error',
                        text1: 'Authentication Failed',
                        text2: handleDetailedError(error.response.data.detail || 'Invalid credentials'),
                    });
                    return Promise.reject(error);
                }

                originalRequest._retry = true;

                try {
                    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);

                    if (!refreshToken) {
                        throw new Error("No refresh token available");
                    }

                    const { data } = await axios.post(`${baseURL}token/refresh/`, {
                        refresh: refreshToken,
                    });

                    const { access: newAccessToken, refresh: newRefreshToken } = data;

                    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccessToken);
                    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newRefreshToken);

                    setApiAuthHeader(newAccessToken);
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    return apiClient(originalRequest);

                } catch (refreshError: any) {

                    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
                    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);

                    Toast.show({
                        type: 'error',
                        text1: 'Session Expired',
                        text2: 'Please log in again.'
                    });

                    return Promise.reject(refreshError);
                }

            } else if (status == 403) {
                Toast.show({
                    type: 'error',
                    text1: 'Permission Denied',
                    text2: handleDetailedError(error.response.data.detail)
                });
            } else if (status == 404) {
                Toast.show({
                    type: 'error',
                    text1: 'Not Found',
                    text2: handleDetailedError(error.response.data.detail)
                });
            } else if (status >= 500) {
                Toast.show({
                    type: 'error',
                    text1: 'Server Error',
                    text2: 'Please try again later.'
                });
            }
        } else if (error.request) {
            Toast.show({
                type: 'error',
                text1: 'Network Error',
                text2: 'Could not connect to the server.'
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'An unexpected error occurred.'
            });
        }
        return Promise.reject(error);
    }
);

export default apiClient;