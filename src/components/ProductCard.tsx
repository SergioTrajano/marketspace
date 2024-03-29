import { api } from "@services/api";
import { Box, VStack } from "native-base";
import { Avatar } from "./Avatar";
import { Image } from "./Image";
import { PriceText } from "./PriceText";
import { Tag } from "./Tag";
import { Text } from "./Text";
import { Title } from "./Title";

type Props = {
    isActive?: boolean;
    tagText: "NOVO" | "USADO";
    price: string;
    productName: string;
    renderAvatar?: boolean;
    avatarPath: string;
    productImagePath: string;
};

export function ProductCard({
    isActive = true,
    tagText,
    price,
    productName,
    renderAvatar = true,
    avatarPath,
    productImagePath,
}: Props) {
    const priceColor = isActive ? "gray.100" : "gray.400";
    const textColor = isActive ? "gray.200" : "gray.400";
    const avatarDisplay = renderAvatar ? "flex" : "none";
    const displayMessage = isActive ? "none" : "flex";
    const imageOpacity = isActive ? 1 : 0.45;

    return (
        <VStack>
            <Box position="relative">
                <Image
                    source={{ uri: `${api.defaults.baseURL}/images/${productImagePath}` }}
                    width={42}
                    height={25}
                    rounded="md"
                    opacity={imageOpacity}
                    backgroundColor="gray.100"
                />
                <Avatar
                    source={{ uri: `${api.defaults.baseURL}/images/${avatarPath}` }}
                    size={8}
                    borderColor="gray.700"
                    borderWidth="1px"
                    position="absolute"
                    top={1}
                    left={1}
                    display={avatarDisplay}
                    opacity={imageOpacity}
                />
                <Tag
                    text={tagText}
                    position="absolute"
                    top={1}
                    right={1}
                    opacity={imageOpacity}
                />
                <Title
                    title="ANÚNCIO DESATIVADO"
                    color="gray.700"
                    fontSize="2xs"
                    display={displayMessage}
                    backgroundColor={"none"}
                    position={"absolute"}
                    bottom={2}
                    left={1}
                />
            </Box>

            <Text
                text={productName}
                color={textColor}
                marginTop={1}
            />
            <PriceText
                price={price}
                color={priceColor}
            />
        </VStack>
    );
}
