import { Text } from "@components/Text";
import { Title } from "@components/Title";
import { Box, HStack, Icon, ScrollView, VStack } from "native-base";

import { Avatar } from "@components/Avatar";
import { Tag } from "@components/Tag";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AppStackProps } from "@routes/app.routes";
import { Octicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import ImagesCarousel from "@components/ImagesCarousel";

export function AdPreview() {
    const images = [
        "http://github.com/SergioTrajano.png",
        "http://github.com/SergioTrajano.png",
        "http://github.com/SergioTrajano.png",
    ];

    const { goBack, navigate } = useNavigation<AppStackProps>();

    function handleGoBack() {
        goBack();
    }

    function handlePublish() {
        navigate("MyAdDetails");
    }

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
                <ImagesCarousel images={images} />

                <VStack
                    px={6}
                    marginTop={5}
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
