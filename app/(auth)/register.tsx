import Button from "@/components/button";
import FormInput from "@/components/form-input";
import FormRedirectLink from "@/components/form-redirect-link";
import { theme } from "@/constants/theme";
import { useAuth } from "@/contexts/auth-context";
import { useErrors } from "@/hooks/useErrors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
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
    };

    const handleSubmit = async () => {
        setLoading(true);
        clearErrors();

        try {
            await registerUser(formData);

            Toast.show({
                type: "success",
                text1: "Registration Successful",
                text2: "Verification code sent to your email.",
            });

            router.replace("/(auth)/(account-verification)/verify");
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
                <ScrollView
                    contentContainerStyle={styles.scrollContentContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <MaterialCommunityIcons
                        name="account-plus-outline"
                        size={64}
                        color={theme.colors.textAccent}
                        style={styles.icon}
                    />

                    <Text style={styles.form_header}>Create Account</Text>

                    <Text style={styles.description}>
                        Join us! Just fill in the details below to get started.
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
                            value={formData.password}
                            onChangeText={(text) => handleInputChange("password", text)}
                            autoCapitalize="none"
                            errors={errors.password}
                            secureTextEntry
                        />
                        <FormInput
                            placeholder="Confirm Password"
                            value={formData.password_confirmation}
                            onChangeText={(text) =>
                                handleInputChange("password_confirmation", text)
                            }
                            autoCapitalize="none"
                            errors={errors.password_confirmation}
                            secureTextEntry
                        />

                        <Button
                            title="Register"
                            onPress={handleSubmit}
                            loading={loading}
                        />

                        <View style={styles.bottom_links_container}>
                            <FormRedirectLink
                                body="You already have an account?"
                                linkText=" Sign in"
                                href="/(auth)/login"
                            />
                        </View>
                    </View>
                </ScrollView>
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
    },
    scrollContentContainer: {
        flexGrow: 1,
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
        gap: theme.spacing.m,
    },
    bottom_links_container: {
        marginTop: theme.spacing.l,
        alignItems: "center",
        gap: theme.spacing.sm,
    },
});

export default RegisterScreen;