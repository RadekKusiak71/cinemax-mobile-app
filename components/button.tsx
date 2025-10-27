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
                <ActivityIndicator color="#ffffff" />
                :
                <Text style={styles.buttonText}>{title}</Text>
            }
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 48,
        backgroundColor: "#3b82f6",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontWeight: "bold",
    },
});


export default Button;