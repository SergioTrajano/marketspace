import { Avatar as NativeBaseAvatar, IAvatarProps } from "native-base";

type Props = IAvatarProps & {
    size: 6 | 11 | 22;
    borderWidth: "1" | "2" | "3";
    borderColor: "gray.700" | "blue.500";
};

export function Avatar({ size, borderWidth, borderColor, ...rest }: Props) {
    return (
        <NativeBaseAvatar
            source={{ uri: "https://www.github.com/SergioTrajano.png" }}
            borderWidth={borderWidth}
            borderColor={borderColor}
            size={size}
            {...rest}
        ></NativeBaseAvatar>
    );
}
