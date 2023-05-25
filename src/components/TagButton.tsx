import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, IButtonProps, Icon, Text } from "native-base";

type Props = IButtonProps & {
    text: "NOVO" | "USADO";
    isSelected: boolean;
};

export function TagButton({ text, isSelected, ...rest }: Props) {
    const buttonBackgroundColor = isSelected ? "blue.500" : "gray.500";
    const icon = isSelected ? (
        <Icon
            as={MaterialCommunityIcons}
            name="close-circle"
            size={4}
        />
    ) : (
        <></>
    );
    const textColor = isSelected ? "white" : "gray.300";

    return (
        <Button
            backgroundColor={buttonBackgroundColor}
            borderLeftRadius="full"
            borderRightRadius="full"
            alignItems="center"
            justifyContent={isSelected ? "space-between" : "center"}
            rightIcon={icon}
            width={20}
            height={8}
            py={0.5}
            {...rest}
        >
            <Text
                fontSize="2xs"
                fontFamily="heading"
                lineHeight="md"
                color={textColor}
            >
                {text}
            </Text>
        </Button>
    );
}
