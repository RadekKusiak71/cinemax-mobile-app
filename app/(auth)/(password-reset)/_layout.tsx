import { Stack } from "expo-router";

const PasswordResetLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="change" options={{ headerShown: false }} />
            <Stack.Screen name="request" options={{ headerShown: false }} />
        </Stack>
    );
};

export default PasswordResetLayout;