import { AntDesign, Feather } from "@expo/vector-icons";
import {
    FormControl,
    IInputProps,
    Icon,
    Input as NativeBaseInput,
    Pressable,
    Text,
} from "native-base";
import { useState } from "react";

type Props = IInputProps & {
    inputType?: "PASSWORD" | "CURRENCY" | "DEFAULT";
    errorMessage?: string;
};

export function Input({ inputType = "DEFAULT", errorMessage = "", ...rest }: Props) {
    const [hide, setHide] = useState<boolean>(true);

    return (
        <FormControl
            isInvalid={!!errorMessage}
            position="relative"
        >
            <NativeBaseInput
                type={inputType === "PASSWORD" && hide ? "password" : "text"}
                size="md"
                borderRadius={"lg"}
                marginBottom={6}
                marginTop={2}
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

            <FormControl.ErrorMessage
                _text={{ color: "red.500" }}
                position="absolute"
                bottom={0}
                left={0}
                leftIcon={
                    <Icon
                        as={AntDesign}
                        name="exclamationcircleo"
                        color="red.500"
                    />
                }
            >
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}
