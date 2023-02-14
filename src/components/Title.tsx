import { Heading, IHeadingProps } from "native-base";

type Props = IHeadingProps & {
    title: string;
};

export function Title({ title, ...rest }: Props) {
    return (
        <Heading
            fontFamily="heading"
            lineHeight="md"
            {...rest}
        >
            {title}
        </Heading>
    );
}
