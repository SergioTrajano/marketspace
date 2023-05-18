import { IImageProps, Image as NativeBaseImage } from "native-base";

import { closestSizeAcceptable } from "@utils/closestSizeAcceptableInNativeBase";

type Props = IImageProps & {
    widthSize?: number;
    heightSize?: number;
};

export function Image({ widthSize, heightSize, ...rest }: Props) {
    return (
        <NativeBaseImage
            alt="Imagem do produto"
            width={widthSize ? closestSizeAcceptable(widthSize) : "20"}
            height={heightSize ? closestSizeAcceptable(heightSize) : "20"}
            resizeMode="cover"
            {...rest}
        />
    );
}
