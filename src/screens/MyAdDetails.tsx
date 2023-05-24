import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import ImagesCarousel from "@components/ImagesCarousel";
import { Loading } from "@components/Loading";
import { PaymentMethods } from "@components/PaymentMethods";
import { Tag } from "@components/Tag";
import { Text } from "@components/Text";
import { Title } from "@components/Title";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppStackProps, AppTabProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Box, HStack, Icon, Pressable, ScrollView, VStack, useToast } from "native-base";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Payment_method } from "./CreateAd";

type ProductProps = {
    accept_trade: boolean;
    created_at: string;
    description: string;
    id: string;
    is_active: boolean;
    is_new: boolean;
    name: string;
    payment_methods: { key: Payment_method; name: string }[];
    price: number;
    product_images: { id: string; path: string }[];
    updated_at: string;
    user: { avatar: string; name: string; tel: string };
    user_id: string;
};

export function MyAdDetails() {
    const [productData, setProductData] = useState<ProductProps>({} as ProductProps);
    const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(true);
    const [isDisabling, setIsDisabling] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const toast = useToast();
    const route = useRoute();

    const { productId } = route.params as { productId: string };

    const stackNavigation = useNavigation<AppStackProps>();
    const tabsNavigation = useNavigation<AppTabProps>();

    function handleGoBack() {
        stackNavigation.goBack();
    }

    function handleEditAd() {
        stackNavigation.navigate("EditAd", { productId });
    }

    async function handleToggleIsActive() {
        setIsDisabling(true);

        try {
            const requestBody = {
                is_active: !productData.is_active,
            };

            await api.patch(`/products/${productData.id}`, requestBody);

            setProductData({ ...productData, is_active: !productData.is_active });
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError
                ? error.message
                : "Houve um erro na desativação. Tente novamente mais tarde!";

            toast.show({ title, backgroundColor: "red.500", placement: "top" });
        } finally {
            setIsDisabling(false);
        }
    }

    async function handleDeleteAd() {
        setIsDeleting(true);

        try {
            await api.delete(`/products/${productData.id}`);

            tabsNavigation.navigate("MyAds");
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError
                ? error.message
                : "Houve um erro na exclusão. Tente novamente mais tarde!";

            toast.show({ title, backgroundColor: "red.500", placement: "top" });

            setIsDeleting(false);
        }
    }

    async function loadProductData() {
        try {
            const { data } = await api.get(`/products/${productId}`);

            setProductData(data);
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError
                ? error.message
                : "Não foi possível carregar os dados do anúncio. Tente novamente mais tarde!";

            toast.show({ title, backgroundColor: "red.500", placement: "top" });

            tabsNavigation.navigate("MyAds");
        } finally {
            setIsLoadingProduct(false);
        }
    }

    useEffect(() => {
        loadProductData();
    }, []);

    if (isLoadingProduct) {
        return <Loading />;
    }

    return (
        <SafeAreaView>
            <ScrollView
                backgroundColor="gray.600"
                height="100%"
            >
                <HStack
                    justifyContent="space-between"
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

                    <Pressable onPress={handleEditAd}>
                        <Icon
                            as={AntDesign}
                            name="edit"
                            size="2xl"
                            color="gray.100"
                        />
                    </Pressable>
                </HStack>

                <Box>
                    <Box position="relative">
                        <ImagesCarousel
                            images={productData.product_images.map(
                                (image) => `${api.defaults.baseURL}/images/${image.path}`
                            )}
                        />

                        {productData.is_active === false && (
                            <Box
                                position="absolute"
                                top={0}
                                left={0}
                                width="100%"
                                height="100%"
                                zIndex={1}
                                backgroundColor="gray.100"
                                opacity={0.6}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text
                                    text="ANÚNCIO DESATIVADO"
                                    color="gray.700"
                                    fontWeight="bold"
                                />
                            </Box>
                        )}
                    </Box>

                    <VStack
                        marginTop={5}
                        px={6}
                    >
                        <HStack alignItems="center">
                            <Avatar
                                source={{
                                    uri: `${api.defaults.baseURL}/images/${productData.user.avatar}`,
                                }}
                                size={8}
                                borderWidth={"2px"}
                                borderColor={"blue.500"}
                            />

                            <Text
                                text={productData.user.name}
                                fontSize="md"
                                marginLeft={2}
                            />
                        </HStack>

                        <Tag
                            text={!productData.is_new ? "NOVO" : "USADO"}
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
                                    title={productData.name}
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
                                        text={(productData.price / 100)
                                            .toFixed(2)
                                            .replace(".", ",")}
                                        fontSize="xl"
                                        fontWeight="bold"
                                        color="blue.500"
                                    />
                                </HStack>
                            </HStack>

                            <Text
                                text={productData.description}
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
                                    text={productData.accept_trade ? "Sim" : "Não"}
                                    color="gray.200"
                                />
                            </HStack>

                            <VStack marginTop={4}>
                                <Title
                                    title="Meios de pagamento"
                                    fontSize="sm"
                                    color="gray.200"
                                    marginBottom={2}
                                />

                                {productData.payment_methods.map((method) => (
                                    <PaymentMethods
                                        method={method.key}
                                        key={method.key}
                                    />
                                ))}
                            </VStack>
                        </VStack>
                    </VStack>
                </Box>

                <VStack
                    width="100%"
                    px={6}
                    space={2}
                    marginTop={4}
                    marginBottom={4}
                >
                    {productData.is_active ? (
                        <Button
                            text="Desativar anúncio"
                            icon="power-standby"
                            buttonType="PRIMARY"
                            flex={1}
                            onPress={handleToggleIsActive}
                            isLoading={isDisabling}
                            isDisabled={isDeleting}
                        />
                    ) : (
                        <Button
                            text="Reativar anúncio"
                            icon="power-standby"
                            buttonType="SECONDARY"
                            flex={1}
                            onPress={handleToggleIsActive}
                            isLoading={isDisabling}
                            isDisabled={isDeleting}
                        />
                    )}
                    <Button
                        text="Excluir anúncio"
                        icon="trash-can-outline"
                        buttonType="TERCIARY"
                        flex={1}
                        onPress={handleDeleteAd}
                        isLoading={isDeleting}
                        isDisabled={isDisabling}
                    />
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
