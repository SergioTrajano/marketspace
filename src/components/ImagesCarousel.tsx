import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Icon, Pressable, useTheme } from "native-base";
import { useRef, useState } from "react";
import { Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "./Image";

type Props = {
    images: string[];
};

export default function ImagesCarousel({ images }: Props) {
    const { colors } = useTheme();
    const imageWidth = Dimensions.get("window").width;
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    let carouselRef: any = useRef();

    return (
        <GestureHandlerRootView style={{ position: "relative" }}>
            <Carousel
                ref={(ref) => {
                    carouselRef = ref;
                }}
                loop={images.length > 1}
                width={imageWidth}
                height={imageWidth * 0.75}
                autoPlay={true}
                autoPlayInterval={3000}
                data={images}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => setCurrentImageIndex(index)}
                renderItem={({ item, index }) => (
                    <Image
                        key={item + index}
                        source={{ uri: item }}
                        width={imageWidth}
                        height={imageWidth * 0.75}
                    />
                )}
            />
            <HStack
                space={2}
                position="absolute"
                bottom={0.5}
                left={0.5}
                right={0.5}
            >
                {images.length > 1 &&
                    images.map((img, index) => {
                        return (
                            <Box
                                key={img + index}
                                style={{
                                    borderRadius: 1000,
                                    width: (imageWidth - 4 * images.length) / images.length,
                                    height: 4,
                                    backgroundColor:
                                        currentImageIndex === index
                                            ? colors.black
                                            : colors.gray[700],
                                }}
                            />
                        );
                    })}
            </HStack>

            <Pressable
                onPress={() => carouselRef.prev()}
                position="absolute"
                left={2}
                top="1/2"
                display={images.length > 1 ? "flex" : "none"}
            >
                <Icon
                    as={Ionicons}
                    name="arrow-back-circle"
                    color="gray.700"
                    borderRadius="full"
                    size={"2xl"}
                />
            </Pressable>

            <Pressable
                onPress={() => carouselRef.next()}
                position="absolute"
                right={2}
                top="1/2"
                display={images.length > 1 ? "flex" : "none"}
            >
                <Icon
                    as={Ionicons}
                    name="arrow-forward-circle"
                    color="gray.700"
                    borderRadius="full"
                    size={"2xl"}
                />
            </Pressable>
        </GestureHandlerRootView>
    );
}
