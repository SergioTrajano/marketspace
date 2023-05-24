import { Center, ICenterProps, Text } from "native-base";

type Props = ICenterProps & {
    text: "NOVO" | "USADO";
    tagType?: "PRIMARY" | "SECONDARY";
};

export function Tag({ text, tagType = "PRIMARY", ...rest }: Props) {
    const backgroundColor = {
        NOVO: "blue.700",
        USADO: "gray.200",
    };

    return (
        <Center
            backgroundColor={tagType === "PRIMARY" ? backgroundColor[text] : "gray.500"}
            borderLeftRadius="full"
            borderRightRadius="full"
            height={4}
            paddingX={2}
            alignItems="center"
            {...rest}
        >
            <Text
                fontSize="2xs"
                fontFamily="heading"
                lineHeight="md"
                color={tagType === "PRIMARY" ? "white" : "gray.200"}
            >
                {text}
            </Text>
        </Center>
    );
}
