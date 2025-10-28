import { theme } from '@/constants/theme';
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
                placeholderTextColor={theme.colors.textSecondary}
                {...props}
            />
            {props.errors ? handleErrors(props.errors) : null}
        </View>

    );
};

const styles = StyleSheet.create({
    form_input: {
        height: theme.controlHeight.m,
        backgroundColor: theme.colors.inputBackground,
        borderColor: theme.colors.inputBorder,
        color: theme.colors.text,
        borderWidth: 1,
        borderRadius: theme.radii.m,
        paddingHorizontal: theme.spacing.m,
        fontSize: theme.fontSizes.body,
    },
    error_form_input: {
        borderColor: theme.colors.error,
    },
    error_text: {
        color: theme.colors.error,
        marginTop: theme.spacing.s,
    },
});

export default FormInput;