import { IAvatarProps, Avatar as NativeBaseAvatar } from "native-base";

type Props = IAvatarProps & {
    size: 8 | 11 | 22;
    borderWidth: "1px" | "2px" | "3px";
    borderColor: "gray.700" | "blue.500";
};

export function Avatar({ size, borderWidth, borderColor, ...rest }: Props) {
    return (
        <NativeBaseAvatar
            borderWidth={borderWidth}
            borderColor={borderColor}
            size={size}
            {...rest}
        ></NativeBaseAvatar>
    );
}
