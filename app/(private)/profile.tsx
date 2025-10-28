import Button from "@/components/button";
import { useAuth } from "@/contexts/auth-context";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
    const { logoutUser } = useAuth();

    return (
        <SafeAreaView>
            <Text>Profile Screen</Text>
            <Button onPress={logoutUser} title="Logout" />
        </SafeAreaView>
    );
};

export default ProfileScreen;