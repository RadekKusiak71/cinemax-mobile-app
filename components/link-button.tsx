import { Href, Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

type LinkButtonProps = {
    href: Href;
    title: string;
};

const LinkButton: React.FC<LinkButtonProps> = ({ href, title }) => {
    return (
        <Link href={href} style={styles.linkButton}>
            <Text style={styles.linkButtonText}>{title}</Text>
        </Link>
    );
}

const styles = StyleSheet.create({
    linkButton: {
        padding: 15,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    linkButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
    },
});

export default LinkButton;