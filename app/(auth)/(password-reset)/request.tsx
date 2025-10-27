import { requestPasswordReset } from "@/api/auth";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import FormRedirectLink from "@/components/form-redirect-link";
import { useErrors } from "@/hooks/useErrors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
                type: 'success',
                text1: 'Request Successful',
                text2: 'If an account with that email exists, a password reset link has been sent.'
            });

            router.replace('/(auth)/(password-reset)/change');
        } catch (err) {
            parseAndSetErrors(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.form_header}>Request password reset code</Text>
            <View style={styles.form_container}>
                <FormInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    errors={errors.email}
                />


                <Button title="Request" onPress={handleSubmit} loading={loading} />

                <View style={styles.resendContainer}>
                    <FormRedirectLink
                        body="Already have valid code?"
                        linkText=" Click here"
                        href="/(auth)/(password-reset)/change"
                        replace={false}
                    />
                </View>
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
        gap: 16,
    },
    resendContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
});

export default RequestPasswordResetScreen;