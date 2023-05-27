import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import ImagesCarousel from "@components/ImagesCarousel";
import { Loading } from "@components/Loading";
import { PaymentMethods } from "@components/PaymentMethods";
import { Tag } from "@components/Tag";
import { Text } from "@components/Text";
import { Title } from "@components/Title";
import { ProductDTO } from "@dtos/ProductDTO";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "@hooks/userAuth";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { AppStackProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Box, HStack, Icon, Pressable, ScrollView, VStack, useToast } from "native-base";
import { useCallback, useState } from "react";
import { Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function AdDetails() {
    const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
    const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(true);

    const route = useRoute();
    const { productId } = route.params as { productId: string };

    const toast = useToast();

    const { user } = useAuth();

    const { goBack } = useNavigation<AppStackProps>();

    function handleGoBack() {
        goBack();
    }

    function handleGetInTouch() {
        Linking.openURL(
            `https://wa.me/${product.user.tel}?text=${encodeURI(
                `Olá, ${product.user.name}. Sou ${
                    user.name.split(" ")[0]
                }. Vi seu anuncio no Marketspace. Gostaria de comprar o produto *${product.name}*.`
            )}`
        );
    }

    useFocusEffect(
        useCallback(() => {
            loadProduct();
        }, [])
    );

    async function loadProduct() {
        try {
            const { data } = await api.get(`/products/${productId}`);

            setProduct(data);
            setIsLoadingProduct(false);
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError
                ? error.message
                : "Houve um erro na exclusão. Tente novamente mais tarde!";

            toast.show({ title, backgroundColor: "red.500", placement: "top" });

            goBack();
        }
    }

    if (isLoadingProduct) {
        return <Loading />;
    }

    return (
        <SafeAreaView>
            <ScrollView backgroundColor="gray.600">
                <Box
                    backgroundColor="gray.700"
                    px={6}
                    py={4}
                >
                    <Pressable onPress={handleGoBack}>
                        <Icon
                            as={AntDesign}
                            name="arrowleft"
                            size="2xl"
                            color="gray.100"
                        />
                    </Pressable>
                </Box>

                <Box>
                    <ImagesCarousel
                        images={product.product_images.map(
                            (img) => `${api.defaults.baseURL}/images/${img.path}`
                        )}
                    />

                    <VStack
                        marginTop={5}
                        px={6}
                    >
                        <HStack alignItems="center">
                            <Avatar
                                source={{
                                    uri: `${api.defaults.baseURL}/images/${product.user.avatar}`,
                                }}
                                size={8}
                                borderWidth={"2px"}
                                borderColor={"blue.500"}
                            />

                            <Text
                                text={product.user.name}
                                marginLeft={2}
                            />
                        </HStack>

                        <Tag
                            text={product.is_new ? "NOVO" : "USADO"}
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
                                    title={product.name}
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
                                        text={(product.price / 100).toFixed(2).replace(".", ",")}
                                        fontSize="xl"
                                        fontWeight="bold"
                                        color="blue.500"
                                    />
                                </HStack>
                            </HStack>

                            <Text
                                text={product.description}
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
                                    text={product.accept_trade ? "Sim" : "Não"}
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

                                {product.payment_methods.map((method) => (
                                    <PaymentMethods
                                        method={method.key}
                                        key={method.key}
                                    />
                                ))}
                            </VStack>
                        </VStack>
                    </VStack>
                </Box>

                <HStack
                    width="100%"
                    px={6}
                    py={7}
                    marginTop={6}
                    justifyContent="space-between"
                    alignItems="center"
                    backgroundColor="gray.700"
                >
                    <HStack
                        alignItems="baseline"
                        space={2}
                    >
                        <Text
                            text="R$"
                            fontWeight="bold"
                            color="blue.700"
                        />
                        <Text
                            text={(product.price / 100).toFixed(2).replace(".", ",")}
                            fontWeight="bold"
                            fontSize="2xl"
                            color="blue.700"
                        />
                    </HStack>
                    <Button
                        text="Entrar em contato"
                        icon="whatsapp"
                        buttonType="SECONDARY"
                        onPress={handleGetInTouch}
                        width={42}
                        padding={3}
                    />
                </HStack>
            </ScrollView>
        </SafeAreaView>
    );
}
