import { Text } from "@components/Text";
import { Title } from "@components/Title";
import { Box, HStack, Icon, ScrollView, VStack } from "native-base";

import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Tag } from "@components/Tag";
import { MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppStackProps } from "@routes/app.routes";

import ImagesCarousel from "@components/ImagesCarousel";
import { useAuth } from "@hooks/userAuth";
import { api } from "@services/api";
import { NewAdProps } from "./CreateAd";

export function AdPreview() {
    const { goBack, navigate } = useNavigation<AppStackProps>();
    const route = useRoute();

    const newAd = route.params as NewAdProps;
    const { user } = useAuth();

    function handleGoBack() {
        goBack();
    }
    async function handlePublish() {
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
        } catch (e) {
            console.log(e);
        }
    }

    const paymentMethodsComponents = {
        card: (
            <>
                <Icon
                    as={Octicons}
                    name="credit-card"
                    size="md"
                />
                <Text
                    text="Cartão de Crédito"
                    color="gray.200"
                    marginLeft={2}
                />
            </>
        ),
        pix: (
            <>
                <Icon
                    as={MaterialIcons}
                    name="qr-code"
                    size="md"
                />
                <Text
                    text="Pix"
                    color="gray.200"
                    marginLeft={2}
                />
            </>
        ),
        boleto: (
            <>
                <Icon
                    as={MaterialCommunityIcons}
                    name="barcode-scan"
                    size="md"
                />
                <Text
                    text="Boleto"
                    color="gray.200"
                    marginLeft={2}
                />
            </>
        ),
        cash: (
            <>
                <Icon
                    as={MaterialIcons}
                    name="attach-money"
                    size="md"
                />
                <Text
                    text="Dinheiro"
                    color="gray.200"
                    marginLeft={2}
                />
            </>
        ),
        deposit: (
            <>
                <Icon
                    as={MaterialCommunityIcons}
                    name="bank-outline"
                    size="md"
                />
                <Text
                    text="Depósito bancário"
                    color="gray.200"
                    marginLeft={2}
                />
            </>
        ),
    };

    return (
        <Box
            height="100%"
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
                <ImagesCarousel images={newAd.productImages} />

                <VStack
                    px={6}
                    marginTop={5}
                >
                    <HStack alignItems="center">
                        <Avatar
                            source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
                            size={6}
                            borderWidth={"2"}
                            borderColor={"blue.500"}
                        />

                        <Text
                            text={user.name}
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
                            />

                            {newAd.payment_methods.map((method) => (
                                <HStack
                                    key={method}
                                    alignContent="center"
                                    marginTop={2}
                                    marginBottom={1}
                                >
                                    {paymentMethodsComponents[method]}
                                </HStack>
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
            >
                <Button
                    text="Voltar e editar"
                    buttonType="TERCIARY"
                    flex={1}
                    onPress={handleGoBack}
                />
                <Button
                    text="Publicar"
                    buttonType="SECONDARY"
                    icon="tag-outline"
                    flex={1}
                    onPress={handlePublish}
                />
            </HStack>
        </Box>
    );
}
