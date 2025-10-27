import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { Stack } from "expo-router";
import Toast from 'react-native-toast-message';

const Layout = () => {
  const { isLoggedIn } = useAuth();

  return <Stack>
    <Stack.Protected guard={!isLoggedIn}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack.Protected>

    <Stack.Protected guard={isLoggedIn}>
      <Stack.Screen name="(private)" options={{ headerShown: false }} />
    </Stack.Protected>

  </Stack>
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <Layout />
      <Toast />
    </AuthProvider>
  )
}