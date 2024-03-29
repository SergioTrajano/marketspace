import { extendTheme } from "native-base";

export const THEME = extendTheme({
    colors: {
        blue: {
            500: "#647AC7",
            700: "#364D9D",
        },

        red: { 400: "#EE7979" },

        gray: {
            100: "#1A181B",
            200: "#3E3A40",
            300: "#5F5B62",
            400: "#9F9BA1",
            500: "#D9D8DA",
            600: "#EDECEE",
            700: "#F7F7F8",
        },
        white: "#FFFFFF",
    },
    fonts: {
        body: "Karla_400Regular",
        heading: "Karla_700Bold",
    },
    fontSizes: {
        "4xs": 8,
        "2xs": 10,
        xs: 12,
        sm: 14,
        md: 16,
        xl: 20,
        "2xl": 24,
    },
    lineHeights: {
        md: "1.3em",
    },
    sizes: {
        11: 45,
        22: 88,
        25: 100,
        29: 116,
        35: 153,
        42: 168,
        70: 280,
    },
});
