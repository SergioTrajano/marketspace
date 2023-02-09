import { ITextProps, Text } from "native-base";

type Props = ITextProps & {
    title: string;
};

export function Title({ title, ...rest }: Props) {
    return (
        <Text
            fontFamily="heading"
            fontSize="xl"
            lineHeight="md"
            color="gray.100"
        >
            {title}
        </Text>
    );
}
