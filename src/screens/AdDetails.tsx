import { useNavigation } from "@react-navigation/native";
import { AppStackProps } from "@routes/app.routes";
import { Box, HStack, Icon, Pressable, ScrollView, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Octicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import ImagesCarousel from "@components/ImagesCarousel";
import { Text } from "@components/Text";
import { Avatar } from "@components/Avatar";
import { Tag } from "@components/Tag";
import { Title } from "@components/Title";
import { Button } from "@components/Button";

export function AdDetails() {
    const images = [
        "https://github.com/SergioTrajano.png",
        "https://github.com/SergioTrajano.png",
        "https://github.com/SergioTrajano.png",
    ];

    const { goBack } = useNavigation<AppStackProps>();

    function handleGoBack() {
        goBack();
    }

    function handleGetInTouch() {}

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
                    <ImagesCarousel images={images} />

                    <VStack
                        marginTop={5}
                        px={6}
                    >
                        <HStack alignItems="center">
                            <Avatar
                                size={6}
                                borderWidth={"2"}
                                borderColor={"blue.500"}
                            />

                            <Text
                                text="Sergio Trajano"
                                marginLeft={2}
                            />
                        </HStack>

                        <Tag
                            text="USADO"
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
                                    title="Luminária pendente"
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
                                        text="45,00"
                                        fontSize="xl"
                                        fontWeight="bold"
                                        color="blue.500"
                                    />
                                </HStack>
                            </HStack>

                            <Text
                                text="Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. "
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
                                    text="Não"
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

                                <HStack
                                    alignContent="center"
                                    marginTop={2}
                                    marginBottom={1}
                                >
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
                                </HStack>
                                <HStack
                                    alignContent="center"
                                    marginTop={2}
                                    marginBottom={1}
                                >
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
                                </HStack>
                                <HStack
                                    alignContent="center"
                                    marginTop={2}
                                    marginBottom={1}
                                >
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
                                </HStack>
                                <HStack
                                    alignContent="center"
                                    marginTop={2}
                                    marginBottom={1}
                                >
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
                                </HStack>
                                <HStack
                                    alignContent="center"
                                    marginTop={2}
                                    marginBottom={1}
                                >
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
                                </HStack>
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
                            text="45,00"
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
