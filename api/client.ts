import axios from 'axios';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

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

apiClient.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response) {
            const status = error.response.status;

            if (status === 401) {
                Toast.show({
                    type: 'error',
                    text1: handleDetailedError(error.response.data.detail),
                    text2: 'Please log in again.'
                });

                useRouter().navigate('/login');

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