import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Center, FlatList, HStack, Icon, Pressable, VStack, useToast } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ProductCard } from "@components/ProductCard";
import { Select } from "@components/Select";
import { Title } from "@components/Title";

import { Loading } from "@components/Loading";
import { Text } from "@components/Text";
import { ProductDTO } from "@dtos/ProductDTO";
import { useAuth } from "@hooks/userAuth";
import { AppStackProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useCallback, useState } from "react";

type MyProductProps = Omit<ProductDTO, "user">;

export function MyAds() {
    const [userProducts, setUserProducs] = useState<MyProductProps[]>([] as MyProductProps[]);
    const [selectedFilter, setSelectedFilter] = useState<string>("Todos");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { user } = useAuth();
    const { navigate } = useNavigation<AppStackProps>();
    const toast = useToast();

    function handleNewAd() {
        navigate("CreateAd");
    }

    function handleMyAdDetails(id: string) {
        navigate("MyAdDetails", { productId: id });
    }

    function renderProductCard(product: MyProductProps) {
        return (
            <Pressable onPress={() => handleMyAdDetails(product.id)}>
                <ProductCard
                    price={(product.price / 100).toFixed(2).replace(".", ",")}
                    productName={product.name}
                    tagText={product.is_new ? "NOVO" : "USADO"}
                    avatarPath={user.avatar}
                    productImagePath={product.product_images[0].path}
                    isActive={product.is_active}
                />
            </Pressable>
        );
    }

    function filterUserproducts() {
        const filteredProducts = userProducts.filter((product) => {
            if (selectedFilter === "Ativos") {
                return product.is_active === true;
            }
            if (selectedFilter === "Inativos") {
                return product.is_active === false;
            }

            return true;
        });

        return filteredProducts;
    }

    useFocusEffect(
        useCallback(() => {
            loadUserProducts();
        }, [])
    );

    async function loadUserProducts() {
        try {
            const { data } = await api.get("users/products");

            setUserProducs(data);
            setIsLoading(false);
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError
                ? error.message
                : "Não foi possível carregar seus anúncios. Tente novamente!";

            toast.show({ title, backgroundColor: "red.500", placement: "top" });
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <SafeAreaProvider>
            <VStack
                width="100%"
                px={6}
                py={16}
                backgroundColor={"gray.600"}
                minHeight="100%"
            >
                <Center
                    marginBottom={8}
                    position="relative"
                    width="100%"
                >
                    <Title
                        title="Meus anúncios"
                        fontSize={"xl"}
                    />

                    <Pressable
                        onPress={handleNewAd}
                        position="absolute"
                        right={0}
                        bottom={"0.5"}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Icon
                            as={Feather}
                            name="plus"
                            color="gray.100"
                            size="xl"
                        />
                    </Pressable>
                </Center>

                <HStack
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={7}
                >
                    <Text
                        text={
                            userProducts.length <= 1
                                ? `${userProducts.length} anúncio`
                                : `${userProducts.length} anúncios`
                        }
                        fontSize="sm"
                        color="gray.200"
                    />

                    <Select
                        options={["Todos", "Ativos", "Inativos"]}
                        value={selectedFilter}
                        onValueChange={(newValue) => setSelectedFilter(newValue)}
                    />
                </HStack>

                <FlatList
                    data={filterUserproducts()}
                    renderItem={({ item }) => renderProductCard(item)}
                    keyExtractor={(item: MyProductProps) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 34 }}
                    marginBottom={20}
                    ListEmptyComponent={() => (
                        <Center height={64}>
                            <Text
                                text="Você ainda não criou nenhum anúncio... Que tal criar o seu primeiro anúncio?"
                                fontWeight="bold"
                                textAlign="center"
                                fontSize="lg"
                            />
                        </Center>
                    )}
                />
            </VStack>
        </SafeAreaProvider>
    );
}
