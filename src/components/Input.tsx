import { useState } from "react";
import { Input as NativeBaseInput, IInputProps, Icon, Pressable, Text } from "native-base";
import { Feather } from "@expo/vector-icons";

type Props = IInputProps & {
    inputType?: "PASSWORD" | "CURRENCY" | "DEFAULT";
};

export function Input({ inputType = "DEFAULT", ...rest }: Props) {
    const [hide, setHide] = useState<boolean>(true);

    return (
        <NativeBaseInput
            type={inputType === "PASSWORD" && hide ? "password" : "text"}
            size="md"
            borderRadius={"lg"}
            marginBottom={4}
            backgroundColor={"gray.700"}
            fontSize={"md"}
            fontFamily="body"
            color="gray.200"
            placeholderTextColor="gray.400"
            _focus={{
                borderColor: "gray.300",
                borderWidth: "1",
            }}
            placeholder="Placeholder"
            InputLeftElement={
                <Text
                    fontFamily="body"
                    fontSize="md"
                    marginLeft={4}
                    display={inputType === "CURRENCY" ? "flex" : "none"}
                >
                    R$
                </Text>
            }
            InputRightElement={
                <Pressable
                    onPress={() => setHide(!hide)}
                    display={inputType === "PASSWORD" ? "flex" : "none"}
                    marginRight={4}
                >
                    <Icon
                        as={Feather}
                        name="eye"
                        size={5}
                        display={hide ? "flex" : "none"}
                    />
                    <Icon
                        as={Feather}
                        name="eye-off"
                        size={5}
                        display={hide ? "none" : "flex"}
                    />
                </Pressable>
            }
            {...rest}
        />
    );
}
