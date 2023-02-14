import { HStack, Text } from "native-base";

type Props = {
    price: string;
    size?: "xl" | "2xl" | "md";
    color: "gray.100" | "gray.400" | "blue.500";
};

export function PriceText({ price, size = "xl", color }: Props) {
    return (
        <HStack alignItems="baseline">
            <Text
                fontSize="sm"
                lineHeight="md"
                color={color}
                fontFamily="heading"
            >
                R${" "}
            </Text>
            <Text
                fontSize={size}
                lineHeight="md"
                color={color}
                fontFamily="heading"
            >
                {price}
            </Text>
        </HStack>
    );
}
