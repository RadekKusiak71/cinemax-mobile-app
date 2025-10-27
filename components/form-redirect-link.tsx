import { Href, Link } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";


type FormRedirectLinkProps = {
    body: string;
    linkText: string;
    href: Href
};

const FormRedirectLink: React.FC<FormRedirectLinkProps> = ({ body, linkText, href }) => {
    return (
        <Text style={styles.redirect_link}>
            {body}
            <Link
                href={href}
                style={styles.redirect_link_text}
                replace={true}
            >
                {linkText}
            </Link>
        </Text>
    );
};


const styles = StyleSheet.create({
    redirect_link: {
        marginBottom: 16,
        color: "#666",
    },
    redirect_link_text: {
        color: "#3b82f6",
        fontWeight: "bold",
    },
});

export default FormRedirectLink;