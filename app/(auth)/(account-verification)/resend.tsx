import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { resendVerificationCode } from '@/api/auth';
import Button from '@/components/button';
import FormInput from '@/components/form-input';
import { useErrors } from '@/hooks/useErrors';
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
            <View style={styles.content}>
                <Text style={styles.title}>Resend Verification Code</Text>
                <Text style={styles.label}>Enter email to send verification code:</Text>

                <FormInput
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    placeholder="Please enter your email"
                    keyboardType="email-address"
                    textAlign="center"
                    errors={errors.verification_code}
                />

                <Button title="Verify" onPress={handleSubmit} loading={loading} />

            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        gap: 14,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
});

export default ResendAccountVerificationCode