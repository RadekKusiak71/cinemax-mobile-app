import { resendVerificationCode } from '@/api/auth';
import Button from '@/components/button';
import FormInput from '@/components/form-input';
import { theme } from '@/constants/theme';
import { useErrors } from '@/hooks/useErrors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const ResendAccountVerificationCode = () => {
    const router = useRouter();
    const { errors, parseAndSetErrors, clearErrors } = useErrors();

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        clearErrors();

        try {
            await resendVerificationCode(email);
            Toast.show({
                type: 'success',
                text1: 'Verification code resent',
                text2: 'Please check your email for the new code.',
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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingContainer}
            >
                <View style={styles.content}>

                    <MaterialCommunityIcons
                        name="email-check-outline"
                        size={64}
                        color={theme.colors.textAccent}
                        style={styles.icon}
                    />

                    <Text style={styles.title}>Resend Verification Code</Text>

                    <Text style={styles.description}>
                        Enter the email address you used to register and we'll send you a new code.
                    </Text>

                    <FormInput
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                        }}
                        placeholder="Please enter your email"
                        keyboardType="email-address"
                        errors={errors.email}
                    />

                    <Button title="Send Email" onPress={handleSubmit} loading={loading} />

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

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
});

export default ResendAccountVerificationCode;