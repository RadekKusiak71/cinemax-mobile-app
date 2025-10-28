import { confirmPasswordReset } from "@/api/auth";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import FormRedirectLink from "@/components/form-redirect-link";
import { theme } from "@/constants/theme";
import { useErrors } from "@/hooks/useErrors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const ChangePasswordScreen = () => {
    const router = useRouter();
    const { errors, parseAndSetErrors, clearErrors } = useErrors();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        verification_code: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        clearErrors();
        try {
            await confirmPasswordReset(
                formData.verification_code,
                formData.new_password,
                formData.new_password_confirmation
            );

            Toast.show({
                type: "success",
                text1: "Password Reset Successful",
                text2: "You can now log in with your new password.",
            });

            router.replace("/(auth)/login");
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
                <View style={styles.content}>
                    <MaterialCommunityIcons
                        name="lock-reset"
                        size={64}
                        color={theme.colors.textAccent}
                        style={styles.icon}
                    />
                    <Text style={styles.form_header}>Reset password</Text>
                    <Text style={styles.description}>
                        Please enter your verification code and a new, secure
                        password.
                    </Text>

                    <View style={styles.form_container}>
                        <FormInput
                            placeholder="Verification Code"
                            value={formData.verification_code}
                            onChangeText={(text) =>
                                handleInputChange("verification_code", text)
                            }
                            keyboardType="numeric"
                            autoCapitalize="none"
                            errors={errors.verification_code}
                        />

                        <FormInput
                            placeholder="New Password"
                            value={formData.new_password}
                            onChangeText={(text) =>
                                handleInputChange("new_password", text)
                            }
                            autoCapitalize="none"
                            errors={errors.new_password}
                            secureTextEntry
                        />

                        <FormInput
                            placeholder="Confirm New Password"
                            value={formData.new_password_confirmation}
                            onChangeText={(text) =>
                                handleInputChange(
                                    "new_password_confirmation",
                                    text
                                )
                            }
                            autoCapitalize="none"
                            errors={errors.new_password_confirmation}
                            secureTextEntry
                        />

                        <Button
                            title="Reset Password"
                            onPress={handleSubmit}
                            loading={loading}
                        />

                        <View style={styles.resendContainer}>
                            <FormRedirectLink
                                body="Don't have valid code?"
                                linkText=" Click here"
                                href="/(auth)/(password-reset)/request"
                                replace={false}
                            />
                        </View>
                    </View>
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
    },
    content: {
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
        gap: theme.spacing.m,
    },
    resendContainer: {
        alignItems: "center",
        marginTop: theme.spacing.s,
    },
});

export default ChangePasswordScreen;