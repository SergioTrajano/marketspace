import { Avatar } from "@components/Avatar";
import ImagesCarousel from "@components/ImagesCarousel";
import { Tag } from "@components/Tag";
import { Text } from "@components/Text";
import { Title } from "@components/Title";
import { Box, HStack, Icon, Pressable, ScrollView, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Octicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppStackProps } from "@routes/app.routes";

export function MyAdDetails() {
    const images = [
        "https://github.com/SergioTrajano.png",
        "https://github.com/SergioTrajano.png",
        "https://github.com/SergioTrajano.png",
    ];
    const isDeactivated = true;
    const { goBack, navigate } = useNavigation<AppStackProps>();

    function handleGoBack() {
        goBack();
    }

    function handleEditAd() {
        navigate("EditAd");
    }

    function handleDesactivateAd() {}

    function handleDeleteAd() {}

    return (
        <SafeAreaView>
            <ScrollView backgroundColor="gray.600">
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
                        <ImagesCarousel images={images} />
                        {isDeactivated && (
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

                <VStack
                    width="100%"
                    px={6}
                    space={2}
                    marginTop={8}
                    marginBottom={4}
                >
                    {isDeactivated ? (
                        <Button
                            text="Reativar anúncio"
                            icon="power-standby"
                            buttonType="SECONDARY"
                            flex={1}
                            onPress={handleDesactivateAd}
                        />
                    ) : (
                        <Button
                            text="Desativar anúncio"
                            icon="power-standby"
                            buttonType="PRIMARY"
                            flex={1}
                            onPress={handleDesactivateAd}
                        />
                    )}
                    <Button
                        text="Excluir anúncio"
                        icon="trash-can-outline"
                        buttonType="TERCIARY"
                        flex={1}
                        onPress={handleDeleteAd}
                    />
                </VStack>
            </ScrollView>
        </SafeAreaView>
    );
}
