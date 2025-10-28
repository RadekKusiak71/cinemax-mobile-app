import { theme } from '@/constants/theme';
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
    title: string;
    loading?: boolean;
    onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, loading, onPress }) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            {loading ?
                <ActivityIndicator color={theme.colors.textDark} />
                :
                <Text style={styles.buttonText}>{title}</Text>
            }
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: theme.controlHeight.m,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.radii.m,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: theme.colors.textDark,
        fontWeight: "bold",
        fontSize: theme.fontSizes.body,
    },
});

export default Button;