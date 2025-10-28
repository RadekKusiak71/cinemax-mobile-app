import { theme } from '@/constants/theme';
import { Href, Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

type LinkButtonProps = {
    href: Href;
    title: string;
    version?: 'primary' | 'secondary';
};

const LinkButton: React.FC<LinkButtonProps> = ({ href, title, version = "primary" }) => {
    return (
        <Link
            href={href}
            style={[
                styles.linkButton,
                version === 'primary' ? styles.primaryButton : styles.secondaryButton
            ]}
        >
            <Text
                style={[
                    styles.linkButtonText,
                    version === 'primary' ? styles.primaryText : styles.secondaryText
                ]}
            >
                {title}
            </Text>
        </Link>
    );
}

const styles = StyleSheet.create({
    linkButton: {
        paddingVertical: theme.spacing.m,
        borderRadius: theme.radii.m,
        borderWidth: 2,
    },
    primaryButton: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderColor: theme.colors.border,
    },
    linkButtonText: {
        fontSize: theme.fontSizes.subHeader,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    primaryText: {
        color: theme.colors.textDark,
    },
    secondaryText: {
        color: theme.colors.textAccent,
    }
});

export default LinkButton;