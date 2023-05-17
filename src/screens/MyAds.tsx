import { Center, FlatList, HStack, Icon, Pressable, VStack } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { ProductCard } from "@components/ProductCard";
import { Select } from "@components/Select";
import { Title } from "@components/Title";

import { AppStackProps } from "@routes/app.routes";
import { Text } from "@components/Text";
import { useState } from "react";

export function MyAds() {
    const products = [
        {
            avatar: "https://github.com/SergioTrajano.png",
            tagText: "USADO",
            price: 15,
            productName: "Sapato",
        },
        {
            avatar: "https://github.com/SergioTrajano.png",
            tagText: "USADO",
            price: 15,
            productName: "Joia",
        },
        {
            avatar: "https://github.com/SergioTrajano.png",
            tagText: "NOVO",
            price: 15,
            productName: "Sapato",
        },
        {
            avatar: "https://github.com/SergioTrajano.png",
            tagText: "NOVO",
            price: 15,
            productName: "Brinco",
        },
        {
            avatar: "https://github.com/SergioTrajano.png",
            tagText: "USADO",
            price: 15,
            productName: "Calça",
        },
        {
            avatar: "https://github.com/SergioTrajano.png",
            tagText: "NOVO",
            price: 15,
            productName: "Camisa",
        },
        {
            avatar: "https://github.com/SergioTrajano.png",
            tagText: "NOVO",
            price: 15,
            productName: "Camisa",
        },
    ];
    const [selectedValue, setSelectedValue] = useState<string>("Todos");

    const { navigate } = useNavigation<AppStackProps>();

    function handleNewAd() {
        navigate("CreateAd");
    }

    function handleMyAdDetails() {
        navigate("MyAdDetails");
    }

    function renderProductCard(item: any) {
        return (
            <Pressable onPress={handleMyAdDetails}>
                <ProductCard
                    price={item.price}
                    productName={item.productName}
                    tagText={item.tagText}
                />
            </Pressable>
        );
    }

    return (
        <SafeAreaProvider>
            <VStack
                width="100%"
                px={6}
                py={16}
                backgroundColor={"gray.600"}
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
                        top={1.5}
                    >
                        <Icon
                            as={Feather}
                            name="plus"
                            color="gray.100"
                            size="lg"
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
                        text="5 anúncios"
                        fontSize="sm"
                        color="gray.200"
                    />

                    <Select
                        options={["Todos", "Ativos", "Inativos"]}
                        value={selectedValue}
                        onValueChange={(newValue) => setSelectedValue(newValue)}
                    />
                </HStack>

                <FlatList
                    data={products}
                    renderItem={({ item }) => renderProductCard(item)}
                    keyExtractor={(item: any, i: number) => `${item.productName} ${i}`}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 34 }}
                    marginBottom={20}
                />
            </VStack>
        </SafeAreaProvider>
    );
}
