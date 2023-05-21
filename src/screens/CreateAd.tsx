import { Button } from "@components/Button";
import { CheckBox } from "@components/CheckBox";
import { Image } from "@components/Image";
import { Input } from "@components/Input";
import { RadioGroup } from "@components/RadioGroup";
import { Switch } from "@components/Switch";
import { Title } from "@components/Title";
import { Box, Center, HStack, Icon, Pressable, TextArea, VStack, ScrollView } from "native-base";

import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Text } from "@components/Text";
import { useNavigation } from "@react-navigation/native";
import { AppStackProps, AppTabProps } from "@routes/app.routes";
import { useState } from "react";
import { getPhoto } from "@utils/getPhoto";

export function CreateAd() {
    const [images, setImages] = useState<string[]>([] as string[]);
    const { goBack, navigate: stackNavigate } = useNavigation<AppStackProps>();
    const { navigate: tabNavigate } = useNavigation<AppTabProps>();

    function handleGoBack() {
        goBack();
    }

    function handleCancel() {
        tabNavigate("MyAds");
    }

    function handleFoward() {
        stackNavigate("AdPreview");
    }

    async function selectImage() {
        const selectPhoto = await getPhoto();

        if (selectPhoto) {
            setImages((prev) => [...prev, selectPhoto]);
        }
    }

    function deleteImage(deletedImage: string) {
        setImages(images.filter((img) => img !== deletedImage));
    }

    function renderImages() {
        return images.map((image) => (
            <Box
                position="relative"
                key={image}
            >
                <Image
                    width={25}
                    height={25}
                    alt="ProductImage"
                    source={{ uri: image }}
                    borderRadius="lg"
                />
                <Pressable
                    position="absolute"
                    right={1}
                    top={1}
                    onPress={() => deleteImage(image)}
                >
                    <Icon
                        as={AntDesign}
                        name="closecircle"
                        size="md"
                        color="black"
                        backgroundColor="white"
                        borderRadius="full"
                    />
                </Pressable>
            </Box>
        ));
    }

    return (
        <SafeAreaView>
            <ScrollView width="100%">
                <VStack
                    width="100%"
                    px={6}
                    py={6}
                    backgroundColor="gray.600"
                >
                    <Center
                        width="100%"
                        position="relative"
                        marginBottom={6}
                    >
                        <Pressable
                            onPress={handleGoBack}
                            position="absolute"
                            top={0}
                            left={0}
                        >
                            <Icon
                                as={Feather}
                                name="arrow-left"
                                color="gray.100"
                                size="xl"
                            />
                        </Pressable>

                        <Title
                            title="Criar anúncio"
                            fontSize="xl"
                        />
                    </Center>

                    <VStack marginBottom={8}>
                        <Title
                            title="Imagens"
                            fontSize="md"
                            marginBottom={1}
                        />

                        <Text
                            text="Escolha até 3 imagens para mostrar o quando o seu produto é incrível!"
                            color="gray.300"
                            marginBottom={6}
                        />

                        <HStack space={6}>
                            {renderImages()}

                            <Pressable
                                width={25}
                                height={25}
                                justifyContent="center"
                                alignItems="center"
                                backgroundColor="gray.500"
                                borderRadius="md"
                                display={images.length < 3 ? "flex" : "none"}
                                onPress={selectImage}
                            >
                                <Icon
                                    as={Feather}
                                    name="plus"
                                    color="gray.400"
                                />
                            </Pressable>
                        </HStack>
                    </VStack>

                    <VStack marginBottom={8}>
                        <Title
                            title="Sobre o produto"
                            fontSize="md"
                            color="gray.200"
                            marginBottom={4}
                        />

                        <Input
                            placeholder="Título do anúncio"
                            fontSize="md"
                            marginBottom={4}
                        />

                        <TextArea
                            h={40}
                            placeholder="Descrição do produto"
                            autoCompleteType={true}
                            backgroundColor="gray.700"
                            borderRadius="lg"
                            fontSize="md"
                            marginBottom={4}
                        />

                        <RadioGroup
                            name="ProductType"
                            options={["Produto novo", "Produto usado"]}
                        />
                    </VStack>

                    <Box marginBottom={4}>
                        <Title
                            title="Venda"
                            color="gray.200"
                            fontSize="md"
                            marginBottom={4}
                        />

                        <Input
                            placeholder="Valor do produto"
                            inputType="CURRENCY"
                        />
                    </Box>

                    <Box>
                        <Title
                            title="Aceita troca?"
                            color="gray.200"
                            fontSize="sm"
                        />

                        <Switch />
                    </Box>

                    <VStack space={3}>
                        <Title
                            title="Meios de pagamento aceitos"
                            color="gray.200"
                            fontSize="sm"
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
                </VStack>

                <HStack
                    backgroundColor="white"
                    px={6}
                    py={5}
                    space={"3%"}
                >
                    <Button
                        text="Cancelar"
                        buttonType="TERCIARY"
                        flex={1}
                        onPress={handleCancel}
                    />
                    <Button
                        text="Avançar"
                        buttonType="PRIMARY"
                        flex={1}
                        onPress={handleFoward}
                    />
                </HStack>
            </ScrollView>
        </SafeAreaView>
    );
}