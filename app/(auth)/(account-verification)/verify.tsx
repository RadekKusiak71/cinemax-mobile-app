import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { verifyAccount } from '@/api/auth';
import Button from '@/components/button';
import FormInput from '@/components/form-input';
import FormRedirectLink from '@/components/form-redirect-link';
import { useErrors } from '@/hooks/useErrors';
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
            <View style={styles.content}>
                <Text style={styles.title}>Verify Your Account</Text>
                <Text style={styles.label}>Enter the 6-digit code:</Text>

                <FormInput
                    value={verificationCode}
                    onChangeText={(text) => {
                        setVerificationCode(text);
                    }}
                    placeholder="123456"
                    maxLength={6}
                    textAlign="center"
                    errors={errors.verification_code}
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        gap: 15,
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
    resendContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
});

export default VerifyAccountPage;