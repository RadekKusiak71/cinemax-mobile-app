import { confirmPasswordReset } from "@/api/auth";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import FormRedirectLink from "@/components/form-redirect-link";
import { useErrors } from "@/hooks/useErrors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const ChangePasswordScreen = () => {
    const router = useRouter();
    const { errors, parseAndSetErrors, clearErrors } = useErrors();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        verification_code: '',
        new_password: '',
        new_password_confirmation: '',
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    }

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
                type: 'success',
                text1: 'Password Reset Successful',
                text2: 'You can now log in with your new password.'
            });

            router.replace('/(auth)/login');
        } catch (err) {
            parseAndSetErrors(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.form_header}>Reset password</Text>
            <View style={styles.form_container}>

                <FormInput
                    placeholder="Verification Code"
                    value={formData.verification_code}
                    onChangeText={(text) => handleInputChange('verification_code', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    errors={errors.verification_code}
                />

                <FormInput
                    placeholder="New Password"
                    value={formData.new_password}
                    onChangeText={(text) => handleInputChange("new_password", text)}
                    autoCapitalize="none"
                    errors={errors.new_password}
                />

                <FormInput
                    placeholder="Confirm New Password"
                    value={formData.new_password_confirmation}
                    onChangeText={(text) => handleInputChange("new_password_confirmation", text)}
                    autoCapitalize="none"
                    errors={errors.new_password_confirmation}
                />

                <Button title="Request" onPress={handleSubmit} loading={loading} />

                <View style={styles.resendContainer}>
                    <FormRedirectLink
                        body="Don't have valid code?"
                        linkText=" Click here"
                        href="/(auth)/(password-reset)/request"
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


export default ChangePasswordScreen;