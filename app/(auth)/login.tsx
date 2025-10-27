import Button from "@/components/button";
import FormInput from "@/components/form-input";
import FormRedirectLink from "@/components/form-redirect-link";
import { useAuth } from "@/contexts/auth-context";
import { useErrors } from "@/hooks/useErrors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const LoginScreen: React.FC = () => {
    const router = useRouter();
    const { loginUser } = useAuth();
    const { errors, parseAndSetErrors, clearErrors } = useErrors();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    }

    const handleSubmit = async () => {
        setLoading(true);
        clearErrors();

        try {
            await loginUser(formData);

            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                text2: 'You have been logged in successfully.'
            });

            router.replace('/(private)/home');
        } catch (err) {
            parseAndSetErrors(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.form_header}>Welcome back!</Text>

            {/* Form container holds inputs, forgot password, and login button */}
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
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => handleInputChange("password", text)}
                    autoCapitalize="none"
                    errors={errors.password}
                />

                <View style={styles.forgot_password_container}>
                    <FormRedirectLink
                        body=""
                        linkText="Forgot password?"
                        href="/(auth)/(password-reset)/request"
                        replace={false}
                    />
                </View>

                <Button title="Login" onPress={handleSubmit} loading={loading} />
            </View>

            <View style={styles.bottom_links_container}>
                <FormRedirectLink
                    body="Don't have an account?"
                    linkText=" Sign up"
                    href="/(auth)/register"
                />
                <FormRedirectLink
                    body="Need to verify?"
                    linkText=" Resend email"
                    href="/(auth)/(account-verification)/verify"
                    replace={false}
                />
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
        gap: 10,
    },

    forgot_password_container: {
        alignItems: 'flex-end',
        marginBottom: 8,
    },
    bottom_links_container: {
        marginTop: 24,
        alignItems: 'center',
        gap: 12,
    },
});

export default LoginScreen;