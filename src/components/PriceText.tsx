import { HStack, Text } from "native-base";

type Props = {
    price: string;
    size?: "xl" | "2xl";
};

export function PriceText({ price, size = "xl" }: Props) {
    return (
        <HStack alignItems="baseline">
            <Text
                fontSize="sm"
                lineHeight="md"
                color="blue.500"
                fontFamily="heading"
            >
                R${" "}
            </Text>
            <Text
                fontSize={size}
                lineHeight="md"
                color="blue.500"
                fontFamily="heading"
            >
                {price}
            </Text>
        </HStack>
    );
}
