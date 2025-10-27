import { Stack } from "expo-router";

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="verify-account" options={{ headerShown: false }} />
            <Stack.Screen name="resend-account-verification-code" options={{ headerShown: false }} />
        </Stack>
    );
};

export default AuthLayout;