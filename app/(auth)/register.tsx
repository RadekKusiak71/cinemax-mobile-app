import Button from "@/components/button";
import FormInput from "@/components/form-input";
import FormRedirectLink from "@/components/form-redirect-link";
import { useAuth } from "@/contexts/auth-context";
import { useErrors } from "@/hooks/useErrors";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";


const RegisterScreen: React.FC = () => {
    const router = useRouter();
    const { registerUser } = useAuth();
    const { errors, parseAndSetErrors, clearErrors } = useErrors();
    const [loading, setLoading] = React.useState(false);

    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    }

    const handleSubmit = async () => {
        setLoading(true);
        clearErrors();

        try {
            await registerUser(formData);

            Toast.show({
                type: 'success',
                text1: 'Registration Successful',
                text2: 'Verification code sent to your email.',
            });

            router.replace('/(auth)/(account-verification)/verify');
        } catch (err) {
            parseAndSetErrors(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.form_header}>Create Account</Text>

            <View style={styles.form_container}>
                <FormInput
                    placeholder="Email"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange("email", text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    errors={errors.email}
                />
                <FormInput
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(text) => handleInputChange("password", text)}
                    autoCapitalize="none"
                    errors={errors.password}
                    secureTextEntry
                />
                <FormInput
                    placeholder="Confirm Password"
                    value={formData.password_confirmation}
                    onChangeText={(text) => handleInputChange("password_confirmation", text)}
                    autoCapitalize="none"
                    errors={errors.password_confirmation}
                    secureTextEntry
                />

                <FormRedirectLink body="You already have an account?" linkText=" Sign in" href="/(auth)/login" />

                <Button title="Register" onPress={handleSubmit} loading={loading} />
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    form_header: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 24,
    },
    form_container: {
        gap: 15,
    },
});

export default RegisterScreen;