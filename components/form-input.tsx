import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type TextInputProps = React.ComponentProps<typeof TextInput>;

type FormInputProps = {
    errors?: string | string[];
} & TextInputProps;

const handleErrors = (errors: string | string[]) => {
    if (Array.isArray(errors)) {
        return (
            <View>
                {errors.map((error, index) => (
                    <Text key={index} style={styles.error_text}>
                        - {error}
                    </Text>
                ))}
            </View>
        )
    }

    return (
        <Text style={styles.error_text}>
            {errors}
        </Text>
    )

}

const FormInput: React.FC<FormInputProps> = (props) => {
    return (
        <View>
            <TextInput
                style={[
                    styles.form_input,
                    props.errors ? styles.error_form_input : null,
                ]}
                {...props}
            />
            {props.errors ? handleErrors(props.errors) : null}
        </View>

    );
};

const styles = StyleSheet.create({
    form_input: {
        height: 48,
        backgroundColor: "#ffffff",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        fontSize: 16,
    },
    error_form_input: {
        borderColor: "#dc2626",
    },
    error_text: {
        color: "#dc2626",
        marginTop: 4,
    },
});

export default FormInput;
