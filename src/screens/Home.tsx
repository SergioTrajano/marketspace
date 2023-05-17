import { SafeAreaView } from "react-native-safe-area-context";
import {
    Box,
    HStack,
    Icon,
    VStack,
    Pressable,
    Divider,
    FlatList,
    Actionsheet,
    useDisclose,
    Switch as NativeSwitch,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Avatar } from "@components/Avatar";
import { Button } from "@components/Button";
import { Text } from "@components/Text";
import { Title } from "@components/Title";
import { Input } from "@components/Input";
import { ProductCard } from "@components/ProductCard";

import { AppStackProps, AppTabProps } from "@routes/app.routes";
import { Switch } from "@components/Switch";
import { Select } from "@components/Select";
import { TagButton } from "@components/TagButton";
import { CheckBox } from "@components/CheckBox";

export function Home() {
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
    const tabNavigation = useNavigation<AppTabProps>();
    const stackNavigation = useNavigation<AppStackProps>();

    function goToMyAds() {
        tabNavigation.navigate("MyAds");
    }

    function goToCreateAd() {
        stackNavigation.navigate("CreateAd");
    }

    function renderProductCard(item: any) {
        return (
            <ProductCard
                price={item.price}
                productName={item.productName}
                tagText={item.tagText}
            />
        );
    }
    const { isOpen, onClose, onOpen } = useDisclose();

    return (
        <SafeAreaView>
            <VStack
                py={6}
                px={6}
                height={"100%"}
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
                            source={{ uri: "https://github.com/SergioTrajano.png" }}
                            size={11}
                            borderColor={"blue.500"}
                            borderWidth={"2"}
                        />

                        <VStack marginLeft={2}>
                            <Text
                                text="Boas Vindas,"
                                color={"gray.100"}
                            />
                            <Text
                                text="Sergio!"
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
                                        title="4"
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
                        InputRightElement={
                            <HStack marginRight={4}>
                                <Pressable onPress={() => console.log("Searching...")}>
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
                                                />
                                                <TagButton text="USADO" />
                                            </HStack>
                                        </VStack>

                                        <VStack marginBottom={6}>
                                            <Text
                                                text="Aceita troca?"
                                                fontSize="md"
                                                fontWeight="bold"
                                                color="gray.200"
                                            />

                                            <Switch alignSelf={"flex-start"} />
                                        </VStack>

                                        <VStack marginBottom={16}>
                                            <Text
                                                text="Meios de pagamento aceitos"
                                                fontSize="sm"
                                                fontWeight="bold"
                                                marginBottom={3}
                                            />

                                            <CheckBox
                                                label="Boleto"
                                                value="Boleto"
                                            />
                                            <CheckBox
                                                label="Pix"
                                                value="Pix"
                                            />
                                            <CheckBox
                                                label="Dinheiro"
                                                value="Dinheiro"
                                            />
                                            <CheckBox
                                                label="Cartão de Crédito"
                                                value="Cartão de Crédito"
                                            />
                                            <CheckBox
                                                label="Depósito Bancário"
                                                value="Depósito Bancário"
                                                onChange={() => console.log("oi")}
                                            />
                                        </VStack>

                                        <HStack
                                            width="100%"
                                            justifyContent={"space-between"}
                                            space={3}
                                        >
                                            <Button
                                                buttonType="TERCIARY"
                                                text="Resetar Filtros"
                                                flex={1}
                                            />

                                            <Button
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

                <FlatList
                    data={products}
                    renderItem={({ item }) => renderProductCard(item)}
                    keyExtractor={(item: any, i: number) => `${item.productName} ${i}`}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 34 }}
                />
            </VStack>
        </SafeAreaView>
    );
}
