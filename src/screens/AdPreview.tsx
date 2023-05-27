import { Text } from "@components/Text";
import { Title } from "@components/Title";
import { Box, HStack, ScrollView, VStack, useToast } from "native-base";

import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Tag } from "@components/Tag";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppStackProps } from "@routes/app.routes";

import ImagesCarousel from "@components/ImagesCarousel";
import { PaymentMethods } from "@components/PaymentMethods";
import { useAuth } from "@hooks/userAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { ProductFormProps } from "./CreateAd";

export function AdPreview() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { goBack, navigate } = useNavigation<AppStackProps>();

    const route = useRoute();
    const newAd = route.params as ProductFormProps;

    const toast = useToast();

    const { user } = useAuth();

    function handleGoBack() {
        goBack();
    }

    async function handlePublish() {
        setIsLoading(true);

        try {
            const productRequestBody = {
                name: newAd.name,
                description: newAd.description,
                is_new: newAd.is_new === "Produto novo" ? true : false,
                price: Math.floor(Number(newAd.price) * 100),
                accept_trade: newAd.accept_trade,
                payment_methods: newAd.payment_methods,
            };

            const { data } = await api.post("/products", productRequestBody);
            const productimagesRequestBody = new FormData();

            productimagesRequestBody.append("product_id", data.id);
            newAd.productImages.forEach((imageData) => {
                const photoFile = {
                    name: `${user.name}.${imageData.extension}`.toLowerCase(),
                    uri: imageData.uri,
                    type: `${imageData.type}/${imageData.extension}`,
                } as any;

                productimagesRequestBody.append("images", photoFile);
            });

            await api.post("/products/images", productimagesRequestBody, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            navigate("MyAdDetails", { productId: data.id });
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError
                ? error.message
                : "Houve um erro no cadastro do produto. Tente novamente mais tarde!";

            toast.show({ title, backgroundColor: "red.500", placement: "top" });

            setIsLoading(false);
        }
    }

    return (
        <Box
            minHeight="100%"
            width="100%"
            paddingTop={32}
            paddingBottom={20}
        >
            <Box
                position="absolute"
                top={0}
                right={0}
                left={0}
                height={32}
                backgroundColor="blue.500"
                justifyContent="center"
                alignItems="center"
                zIndex={1}
            >
                <Title
                    title="Pré visualização do anúncio"
                    color="gray.700"
                    fontSize="md"
                />

                <Text
                    text="É assim que seu produto vai aparecer!"
                    color="gray.700"
                    fontSize="sm"
                />
            </Box>

            <ScrollView
                showsVerticalScrollIndicator={false}
                backgroundColor="gray.600"
            >
                <ImagesCarousel images={newAd.productImages.map((image) => image.uri)} />

                <VStack
                    px={6}
                    marginTop={5}
                >
                    <HStack alignItems="center">
                        <Avatar
                            source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
                            size={8}
                            borderWidth={"2px"}
                            borderColor={"blue.500"}
                        />

                        <Text
                            text={user.name}
                            fontSize="md"
                            marginLeft={2}
                        />
                    </HStack>

                    <Tag
                        text={newAd.is_new === "Produto novo" ? "NOVO" : "USADO"}
                        maxWidth={16}
                        tagType="SECONDARY"
                        marginTop={6}
                    />

                    <VStack marginTop={2}>
                        <HStack
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Title
                                title={newAd.name}
                                fontSize="xl"
                            />

                            <HStack alignItems="baseline">
                                <Text
                                    text="R$"
                                    color="blue.500"
                                    fontWeight="bold"
                                    marginRight={1}
                                />
                                <Text
                                    text={newAd.price}
                                    fontSize="xl"
                                    fontWeight="bold"
                                    color="blue.500"
                                />
                            </HStack>
                        </HStack>

                        <Text
                            text={newAd.description}
                            color="gray.200"
                            marginTop={2}
                        />

                        <HStack marginTop={6}>
                            <Title
                                title="Aceita troca?"
                                color="gray.200"
                                fontSize="sm"
                                marginRight={2}
                            />
                            <Text
                                text={newAd.accept_trade ? "Sim" : "Não"}
                                color="gray.200"
                            />
                        </HStack>

                        <VStack
                            marginTop={4}
                            marginBottom={4}
                        >
                            <Title
                                title="Meios de pagamento"
                                fontSize="sm"
                                color="gray.200"
                                marginBottom={2}
                            />

                            {newAd.payment_methods.map((method) => (
                                <PaymentMethods
                                    method={method}
                                    key={method}
                                />
                            ))}
                        </VStack>
                    </VStack>
                </VStack>
            </ScrollView>

            <HStack
                width="100%"
                px={6}
                py={5}
                justifyContent="space-between"
                space={3}
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                zIndex={1}
            >
                <Button
                    text="Voltar e editar"
                    buttonType="TERCIARY"
                    flex={1}
                    onPress={handleGoBack}
                    isDisabled={isLoading}
                />
                <Button
                    text="Publicar"
                    buttonType="SECONDARY"
                    icon="tag-outline"
                    flex={1}
                    onPress={handlePublish}
                    isLoading={isLoading}
                />
            </HStack>
        </Box>
    );
}
