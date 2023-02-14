import { Button as NativeBaseButton, IButtonProps, Icon, Text } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = IButtonProps & {
    text: string;
    buttonType: "PRIMARY" | "SECONDARY" | "TERCIARY";
    icon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

export function Button({ text, buttonType, icon, ...rest }: Props) {
    const backgroundColors = {
        PRIMARY: "gray.100",
        SECONDARY: "blue.500",
        TERCIARY: "gray.500",
    };

    return (
        <NativeBaseButton
            size="md"
            borderRadius="md"
            backgroundColor={backgroundColors[buttonType]}
            leftIcon={
                <Icon
                    as={MaterialCommunityIcons}
                    name={icon}
                    color={buttonType === "TERCIARY" ? "gray.200" : "gray.700"}
                    display={icon ? "flex" : "none"}
                    size={4}
                />
            }
            {...rest}
        >
            <Text
                fontFamily="heading"
                fontSize="sm"
                lineHeight="md"
                color={buttonType === "TERCIARY" ? "gray.200" : "gray.700"}
            >
                {text}
            </Text>
        </NativeBaseButton>
    );
}
