import { requestPasswordReset } from "@/api/auth";
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

const RequestPasswordResetScreen = () => {
    const router = useRouter();
    const { errors, parseAndSetErrors, clearErrors } = useErrors();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        clearErrors();
        try {
            await requestPasswordReset(email);

            Toast.show({
                type: "success",
                text1: "Request Successful",
                text2: "If an account with that email exists, a password reset link has been sent.",
            });

            router.replace("/(auth)/(password-reset)/change");
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
                        name="email-lock-outline"
                        size={64}
                        color={theme.colors.textAccent}
                        style={styles.icon}
                    />
                    <Text style={styles.form_header}>Reset Password</Text>
                    <Text style={styles.description}>
                        Enter your email and we'll send a verification code to
                        reset your password.
                    </Text>

                    <View style={styles.form_container}>
                        <FormInput
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            errors={errors.email}
                        />

                        <Button
                            title="Send Request"
                            onPress={handleSubmit}
                            loading={loading}
                        />

                        <View style={styles.resendContainer}>
                            <FormRedirectLink
                                body="Already have valid code?"
                                linkText=" Click here"
                                href="/(auth)/(password-reset)/change"
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

export default RequestPasswordResetScreen;