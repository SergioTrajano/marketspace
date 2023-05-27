import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
    Actionsheet,
    Box,
    Center,
    Divider,
    FlatList,
    HStack,
    Icon,
    Pressable,
    VStack,
    useDisclose,
    useToast,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { ProductCard } from "@components/ProductCard";
import { Text } from "@components/Text";
import { Title } from "@components/Title";

import { CheckBox } from "@components/CheckBox";
import { Loading } from "@components/Loading";
import { Switch } from "@components/Switch";
import { TagButton } from "@components/TagButton";
import { Payment_method, ProductDTO } from "@dtos/ProductDTO";
import { useAuth } from "@hooks/userAuth";
import { AppStackProps, AppTabProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useEffect, useState } from "react";

type ProductProps = Omit<
    ProductDTO,
    "created_at" | "description" | "is_active" | "updated_at" | "user_id"
>;

export function Home() {
    const [products, setProducts] = useState<ProductProps[]>([] as ProductProps[]);
    const [isLoadingProducts, setisLoadingProducts] = useState<boolean>(true);
    const [userproductsQuantity, setUserproductsQuantity] = useState<string>("-");
    const [conditionFilter, setConditionFilter] = useState<string | undefined>(undefined);
    const [acceptTradeFilter, setAcceptTradeFilter] = useState<boolean | undefined>(undefined);
    const [paymentMethodsFilter, setPaymentMethodsFilter] = useState<Payment_method[]>(
        [] as Payment_method[]
    );
    const [nameFilter, setNameFilter] = useState<string>("");
    const [productRequestQuery, setProductRequestQuery] = useState<string>("");

    const { user } = useAuth();

    const { isOpen, onClose, onOpen } = useDisclose();
    const toast = useToast();

    const tabNavigation = useNavigation<AppTabProps>();
    const stackNavigation = useNavigation<AppStackProps>();

    function goToMyAds() {
        tabNavigation.navigate("MyAds");
    }

    function goToCreateAd() {
        stackNavigation.navigate("CreateAd");
    }

    function handleMyAdDetails(productId: string) {
        stackNavigation.navigate("AdDetails", { productId });
    }

    async function resetFilters() {
        setConditionFilter(() => undefined);
        setAcceptTradeFilter(() => undefined);
        setPaymentMethodsFilter(() => [] as Payment_method[]);

        onClose();

        setProductRequestQuery("");
    }

    async function applyFilters() {
        let query = "";

        if (conditionFilter) {
            query += conditionFilter === "NOVO" ? "is_new=true&" : "is_new=false&";
        }
        if (acceptTradeFilter !== undefined) {
            query += `accept_trade=${acceptTradeFilter}&`;
        }
        if (paymentMethodsFilter.length) {
            query += `payment_methods=${JSON.stringify(paymentMethodsFilter)}&`;
        }
        if (nameFilter !== "") {
            query += `query=${nameFilter}&`;
        }

        setProductRequestQuery(query.slice(0, -1));

        onClose();
    }

    function renderProductCard(item: ProductProps) {
        return (
            <Pressable onPress={() => handleMyAdDetails(item.id)}>
                <ProductCard
                    price={(item.price / 100).toFixed(2).replace(".", ",")}
                    productName={item.name}
                    tagText={item.is_new ? "NOVO" : "USADO"}
                    avatarPath={item.user.avatar}
                    productImagePath={item.product_images[0].path}
                />
            </Pressable>
        );
    }

    function changeConditionFilter(condition: string) {
        if (condition === conditionFilter) {
            return setConditionFilter(undefined);
        }

        setConditionFilter(condition);
    }

    useFocusEffect(
        useCallback(() => {
            getUserProductsQuantity();
            loadProducts();
        }, [])
    );

    useEffect(() => {
        loadProducts();
    }, [productRequestQuery]);

    async function getUserProductsQuantity() {
        try {
            const { data }: { data: ProductProps[] } = await api.get("/users/products");

            setUserproductsQuantity(String(data.length));
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError
                ? error.message
                : "Não foi possivel carregar os seus produtos. Tente novamente mais tarde!";

            toast.show({ title, backgroundColor: "red.500", placement: "top" });
        }
    }

    async function loadProducts() {
        setisLoadingProducts(true);

        try {
            const { data } = await api.get(`/products?${productRequestQuery}`);

            setProducts(data);
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError
                ? error.message
                : "Não foi possivel carregar os produtos. Tente novamente mais tarde!";

            toast.show({ title, backgroundColor: "red.500", placement: "top" });
        } finally {
            setisLoadingProducts(false);
        }
    }

    return (
        <SafeAreaView>
            <VStack
                py={6}
                px={6}
                height={"100%"}
                backgroundColor="gray.600"
            >
                <HStack
                    width={"100%"}
                    justifyContent={"space-between"}
                >
                    <HStack
                        marginRight={2}
                        flex={1}
                    >
                        <Avatar
                            source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
                            size={11}
                            borderColor={"blue.500"}
                            borderWidth={"2px"}
                        />

                        <VStack marginLeft={2}>
                            <Text
                                text="Boas Vindas,"
                                color={"gray.100"}
                            />
                            <Text
                                text={`${user.name.split(" ")[0]}!`}
                                fontWeight={"bold"}
                                color={"gray.100"}
                            />
                        </VStack>
                    </HStack>

                    <Button
                        buttonType="PRIMARY"
                        text="Criar anúncio"
                        flex={1}
                        onPress={goToCreateAd}
                    />
                </HStack>

                <VStack
                    width={"100%"}
                    marginTop={8}
                >
                    <Text
                        text="Seus produtos anunciados para venda "
                        color={"gray.300"}
                        marginBottom={3}
                    />

                    <Pressable
                        width={"100%"}
                        onPress={goToMyAds}
                    >
                        <HStack
                            maxWidth={"100%"}
                            minWidth={"100%"}
                            background={"#647AC71A"}
                            borderRadius={"md"}
                            px={4}
                            py={3}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <HStack alignItems={"center"}>
                                <Icon
                                    as={Feather}
                                    name="tag"
                                    color={"blue.700"}
                                    size={"xl"}
                                />

                                <VStack marginLeft={4}>
                                    <Title
                                        title={userproductsQuantity}
                                        color="gray.200"
                                    />

                                    <Text
                                        text="anúncios ativos"
                                        color="gray.200"
                                        fontSize={"xs"}
                                    />
                                </VStack>
                            </HStack>

                            <HStack alignItems={"center"}>
                                <Text
                                    text="Meus anúncios"
                                    color={"blue.700"}
                                    fontWeight={"bold"}
                                    marginRight={2}
                                />
                                <Icon
                                    as={Feather}
                                    name="arrow-right"
                                    color="blue.700"
                                />
                            </HStack>
                        </HStack>
                    </Pressable>
                </VStack>

                <Box
                    marginTop={8}
                    marginBottom={6}
                >
                    <Text
                        text="Compre produtos variados"
                        color={"gray.300"}
                        marginBottom={3}
                    />

                    <Input
                        placeholder="Buscar anúncio"
                        px={4}
                        value={nameFilter}
                        onChangeText={setNameFilter}
                        isDisabled={isLoadingProducts}
                        InputRightElement={
                            <HStack marginRight={4}>
                                <Pressable onPress={applyFilters}>
                                    <Icon
                                        as={Feather}
                                        name="search"
                                        size={5}
                                        marginLeft={3}
                                    />
                                </Pressable>
                                <Divider
                                    orientation="vertical"
                                    width={"0.5"}
                                    height={5}
                                    marginLeft={3}
                                />
                                <Pressable onPress={onOpen}>
                                    <Icon
                                        as={Feather}
                                        name="sliders"
                                        size={5}
                                        marginLeft={3}
                                    />
                                </Pressable>

                                <Actionsheet
                                    isOpen={isOpen}
                                    onClose={onClose}
                                >
                                    <VStack
                                        backgroundColor="white"
                                        width="100%"
                                        borderTopRadius="3xl"
                                        px={6}
                                        py={8}
                                    >
                                        <HStack
                                            justifyContent="space-between"
                                            alignItems="center"
                                            marginBottom={6}
                                        >
                                            <Title
                                                title="Filtrar anúncios"
                                                color="gray.100"
                                            />

                                            <Pressable onPress={onClose}>
                                                <Icon
                                                    as={Feather}
                                                    name="x"
                                                    size="2xl"
                                                    color="gray.400"
                                                />
                                            </Pressable>
                                        </HStack>

                                        <VStack marginBottom={6}>
                                            <Text
                                                text="Condição"
                                                fontSize="md"
                                                color="gray.200"
                                                marginBottom={3}
                                            />

                                            <HStack>
                                                <TagButton
                                                    text="NOVO"
                                                    marginRight={2}
                                                    isSelected={conditionFilter === "NOVO"}
                                                    onPress={() => changeConditionFilter("NOVO")}
                                                />
                                                <TagButton
                                                    text="USADO"
                                                    isSelected={conditionFilter === "USADO"}
                                                    onPress={() => changeConditionFilter("USADO")}
                                                />
                                            </HStack>
                                        </VStack>

                                        <VStack marginBottom={6}>
                                            <Text
                                                text="Aceita troca?"
                                                fontSize="md"
                                                fontWeight="bold"
                                                color="gray.200"
                                            />

                                            <Switch
                                                alignSelf={"flex-start"}
                                                onToggle={() =>
                                                    setAcceptTradeFilter(!acceptTradeFilter)
                                                }
                                                value={acceptTradeFilter}
                                            />
                                        </VStack>

                                        <VStack marginBottom={16}>
                                            <Text
                                                text="Meios de pagamento aceitos"
                                                fontSize="sm"
                                                fontWeight="bold"
                                                marginBottom={3}
                                            />

                                            <CheckBox
                                                options={[
                                                    { label: "Boleto", value: "boleto" },
                                                    { label: "Pix", value: "pix" },
                                                    { label: "Dinheiro", value: "cash" },
                                                    { label: "Cartão de Crédito", value: "card" },
                                                    {
                                                        label: "Depósito Bancário",
                                                        value: "deposit",
                                                    },
                                                ]}
                                                value={paymentMethodsFilter}
                                                onChange={setPaymentMethodsFilter}
                                            />
                                        </VStack>

                                        <HStack
                                            width="100%"
                                            justifyContent={"space-between"}
                                            space={3}
                                        >
                                            <Button
                                                onPress={resetFilters}
                                                buttonType="TERCIARY"
                                                text="Resetar Filtros"
                                                flex={1}
                                            />

                                            <Button
                                                onPress={applyFilters}
                                                buttonType="PRIMARY"
                                                text="Aplicar Filtros"
                                                flex={1}
                                            />
                                        </HStack>
                                    </VStack>
                                </Actionsheet>
                            </HStack>
                        }
                    />
                </Box>

                {isLoadingProducts ? (
                    <Loading />
                ) : (
                    <FlatList
                        data={products}
                        renderItem={({ item }) => renderProductCard(item)}
                        keyExtractor={(item: any, i: number) => `${item.productName} ${i}`}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 34 }}
                        ListEmptyComponent={() => (
                            <Center
                                height={64}
                                background="gray.700"
                                borderRadius="3xl"
                            >
                                <Title
                                    title="Não há produtos para esta busca"
                                    textAlign="center"
                                />
                            </Center>
                        )}
                    />
                )}
            </VStack>
        </SafeAreaView>
    );
}
