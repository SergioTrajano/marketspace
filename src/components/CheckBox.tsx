import { AntDesign } from "@expo/vector-icons";
import {
    FormControl,
    ICheckboxGroupProps,
    Icon,
    Checkbox as NativeBaseCheckbox,
} from "native-base";

type Props = ICheckboxGroupProps & {
    options: {
        value: string;
        label: string;
    }[];
    errorMessage?: string;
};
export function CheckBox({ options, errorMessage, ...rest }: Props) {
    return (
        <FormControl isInvalid={!!errorMessage}>
            <NativeBaseCheckbox.Group {...rest}>
                {options.map((option) => (
                    <NativeBaseCheckbox
                        key={option.value}
                        marginBottom={2}
                        fontFamily="body"
                        fontSize="md"
                        lineHeight="md"
                        value={option.value}
                    >
                        {option.label}
                    </NativeBaseCheckbox>
                ))}
            </NativeBaseCheckbox.Group>

            <FormControl.ErrorMessage
                _text={{ color: "red.500" }}
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
