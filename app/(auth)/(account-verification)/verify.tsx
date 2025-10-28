import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { verifyAccount } from '@/api/auth';
import Button from '@/components/button';
import FormInput from '@/components/form-input';
import FormRedirectLink from '@/components/form-redirect-link';
import { theme } from '@/constants/theme';
import { useErrors } from '@/hooks/useErrors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const VerifyAccountPage: React.FC = () => {
    const router = useRouter();
    const { errors, parseAndSetErrors, clearErrors } = useErrors();

    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        clearErrors();

        try {
            await verifyAccount(verificationCode);
            Toast.show({
                type: 'success',
                text1: 'Account verified',
                text2: 'You can now log in to your account.',
            });
            router.replace('/(auth)/login');
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
                        name="shield-check-outline"
                        size={64}
                        color={theme.colors.textAccent}
                        style={styles.icon}
                    />

                    <Text style={styles.title}>Verify Your Account</Text>

                    <Text style={styles.description}>
                        We sent a 6-chars code to your email. Please enter it below to complete verification.
                    </Text>

                    <FormInput
                        value={verificationCode}
                        onChangeText={(text) => {
                            setVerificationCode(text);
                        }}
                        placeholder="123456"
                        maxLength={6}
                        textAlign="center"
                        errors={errors.verification_code}
                        keyboardType="default"
                    />

                    <Button title="Verify" onPress={handleSubmit} loading={loading} />

                    <View style={styles.resendContainer}>
                        <FormRedirectLink
                            body="Didn't receive a code? "
                            linkText="Resend."
                            href="/(auth)/(account-verification)/resend"
                            replace={false}
                        />
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
        justifyContent: 'center',
        padding: theme.spacing.m,
        gap: theme.spacing.m,
    },
    icon: {
        textAlign: 'center',
        marginBottom: theme.spacing.s,
    },
    title: {
        fontSize: theme.fontSizes.xl,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: theme.spacing.s,
        color: theme.colors.text,
    },
    description: {
        fontSize: theme.fontSizes.body,
        textAlign: 'center',
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.l,
    },
    resendContainer: {
        alignItems: 'center',
        marginTop: theme.spacing.s,
    },
});

export default VerifyAccountPage;