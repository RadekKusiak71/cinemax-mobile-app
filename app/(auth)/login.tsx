import Button from "@/components/button";
import FormInput from "@/components/form-input";
import FormRedirectLink from "@/components/form-redirect-link";
import { theme } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { useErrors } from "@/hooks/useErrors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View
} from "react-native";
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
    };

    const handleSubmit = async () => {
        setLoading(true);
        clearErrors();
        try {
            await loginUser(formData);
            Toast.show({
                type: "success",
                text1: "Login Successful",
                text2: "You have been logged in successfully.",
            });
            router.replace("/(private)/home");
        } catch (err) {
            parseAndSetErrors(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingContainer}
            >
                <MaterialCommunityIcons
                    name="login-variant"
                    size={64}
                    color={theme.colors.textAccent}
                    style={styles.icon}
                />

                <Text style={styles.form_header}>Welcome back!</Text>

                <Text style={styles.description}>
                    Please sign in to continue.
                </Text>

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
                        body="Need to verify account?"
                        linkText=" Click here"
                        href="/(auth)/(account-verification)/verify"
                        replace={false}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    keyboardAvoidingContainer: {
        flex: 1,
        justifyContent: "center",
        padding: theme.spacing.m,
    },
    icon: {
        textAlign: "center",
        marginBottom: theme.spacing.s,
    },
    form_header: {
        fontSize: theme.fontSizes.largeHeader,
        fontWeight: "bold",
        marginBottom: theme.spacing.s,
        color: theme.colors.text,
        textAlign: "center",
    },
    description: {
        fontSize: theme.fontSizes.body,
        textAlign: "center",
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.l,
    },
    form_container: {
        gap: theme.spacing.sm,
    },
    forgot_password_container: {
        alignItems: "flex-end",
        marginBottom: theme.spacing.s,
    },
    bottom_links_container: {
        marginTop: theme.spacing.l,
        alignItems: "center",
        gap: theme.spacing.sm,
    },
});

export default LoginScreen;