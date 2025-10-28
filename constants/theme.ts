const palette = {
    dark: '#1D2023',
    white: '#FFFFFF',
    accent: '#66BFA8',
    gray: '#A9A9A9',
    error: '#dc2626',
    inputBg: '#2a2e32',
};

export const theme = {
    colors: {
        background: palette.dark,
        text: palette.white,
        textAccent: palette.accent,
        textDark: palette.dark,
        textSecondary: palette.gray,
        primary: palette.accent,
        border: palette.accent,
        error: palette.error,
        inputBackground: palette.inputBg,
        inputBorder: palette.gray,
    },
    spacing: {
        s: 8,
        sm: 12,
        m: 16,
        l: 24,
        xl: 40,
    },
    fontSizes: {
        body: 16,
        subHeader: 18,
        xl: 24,
        largeHeader: 32,
        header: 72,
    },
    radii: {
        s: 4,
        m: 8,
        l: 12,
    },
    controlHeight: {
        m: 48,
    }
};

export type Theme = typeof theme;