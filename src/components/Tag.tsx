import { Center, Text, ICenterProps } from "native-base";

type Props = ICenterProps & {
    text: "NOVO" | "USADO";
};

export function Tag({ text, ...rest }: Props) {
    const backgroundColor = {
        NOVO: "blue.700",
        USADO: "gray.200",
    };

    return (
        <Center
            backgroundColor={backgroundColor[text]}
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
                color="white"
            >
                {text}
            </Text>
        </Center>
    );
}
