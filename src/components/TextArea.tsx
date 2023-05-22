import { AntDesign } from "@expo/vector-icons";
import { FormControl, ITextAreaProps, Icon, TextArea as NativeTextArea } from "native-base";

type Props = ITextAreaProps & {
    errorMessage?: string;
};

export function TextArea({ errorMessage, ...rest }: Props) {
    return (
        <FormControl
            isInvalid={!!errorMessage}
            position="relative"
            marginBottom={2}
        >
            <NativeTextArea
                h={40}
                autoCompleteType={true}
                backgroundColor="gray.700"
                borderRadius="lg"
                fontSize="md"
                marginTop={2}
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
