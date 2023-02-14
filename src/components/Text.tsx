import { Text as NativeBaseText, ITextProps } from "native-base";

type Props = ITextProps & {
    text: string;
};

export function Text({ text, ...rest }: Props) {
    return (
        <NativeBaseText
            fontFamily="body"
            lineHeight="md"
            {...rest}
        >
            {text}
        </NativeBaseText>
    );
}
