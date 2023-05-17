import { IImageProps, Image as NativeBaseImage } from "native-base";

type Props = IImageProps & {
    width: "100%" | 25 | 42;
    height: 25 | 70;
};

export function Image({ width, height, ...rest }: Props) {
    return (
        <NativeBaseImage
            source={{ uri: "https://www.github.com/SergioTrajano.png" }}
            alt="Imagem do produto"
            width={width}
            height={height}
            resizeMode="cover"
            {...rest}
        />
    );
}
