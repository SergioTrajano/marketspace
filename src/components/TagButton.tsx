import { useState } from "react";
import { Button, Text, IButtonProps, Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = IButtonProps & {
    text: "NOVO" | "USADO";
};

export function TagButton({ text, ...rest }: Props) {
    const [isSelected, setIsSelected] = useState<boolean>(false);

    function handlePress() {
        setIsSelected((prevIsSelected) => !prevIsSelected);
    }

    const buttonBackgroundColor = isSelected ? "blue.500" : "gray.500";
    const iconDisplay = isSelected ? "flex" : "none";
    const textColor = isSelected ? "white" : "gray.300";

    return (
        <Button
            onPress={handlePress}
            backgroundColor={buttonBackgroundColor}
            borderLeftRadius="full"
            borderRightRadius="full"
            paddingX={2}
            paddingY={"2px"}
            rightIcon={
                <Icon
                    as={MaterialCommunityIcons}
                    name="close-circle"
                    size={4}
                    display={iconDisplay}
                />
            }
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
