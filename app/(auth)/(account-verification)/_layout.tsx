import { Stack } from "expo-router";

const AccountVerificaitonLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="verify" options={{ headerShown: false }} />
            <Stack.Screen name="resend" options={{ headerShown: false }} />
        </Stack>
    );
};

export default AccountVerificaitonLayout;