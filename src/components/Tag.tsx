import { Center, Text, ICenterProps } from "native-base";

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
            paddingX={2}
            paddingY={"2px"}
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
