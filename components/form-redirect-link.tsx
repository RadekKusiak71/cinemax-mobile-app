import { theme } from '@/constants/theme';
import { Href, Link } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";

type FormRedirectLinkProps = {
    body: string;
    linkText: string;
    href: Href;
    replace?: boolean;
};

const FormRedirectLink: React.FC<FormRedirectLinkProps> = ({ body, linkText, href, replace = true }) => {
    return (
        <Text style={styles.redirect_link}>
            {body}
            <Link
                href={href}
                style={styles.redirect_link_text}
                replace={replace}
            >
                {linkText}
            </Link>
        </Text>
    );
};


const styles = StyleSheet.create({
    redirect_link: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontSizes.body,
    },
    redirect_link_text: {
        color: theme.colors.textAccent,
        fontWeight: "bold",
    },
});

export default FormRedirectLink;