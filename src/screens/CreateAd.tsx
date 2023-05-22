import { Button } from "@components/Button";
import { Image } from "@components/Image";
import { Input } from "@components/Input";
import { RadioGroup } from "@components/RadioGroup";
import { Switch } from "@components/Switch";
import { Title } from "@components/Title";
import { Box, Center, HStack, Icon, Pressable, ScrollView, VStack } from "native-base";

import { Text } from "@components/Text";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppStackProps, AppTabProps } from "@routes/app.routes";
import { getPhoto } from "@utils/getPhoto";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CheckBox } from "@components/CheckBox";
import { TextArea } from "@components/TextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAdSchema } from "@schemas/createAdSchema";
import { closestSizeAcceptable } from "@utils/closestSizeAcceptableInNativeBase";
import { Controller, useForm } from "react-hook-form";

type ImagesInfoProps = {
    uri: string;
    type: string;
    extension: string;
};
type payment_method = "pix" | "card" | "deposit" | "cash" | "boleto";

export type NewAdProps = {
    productImages: ImagesInfoProps[];
    name: string;
    description: string;
    is_new: "Produto novo" | "Produto usado";
    accept_trade: boolean;
    payment_methods: payment_method[];
    price: string;
};

export function CreateAd() {
    const { goBack, navigate: stackNavigate } = useNavigation<AppStackProps>();
    const { navigate: tabNavigate } = useNavigation<AppTabProps>();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<NewAdProps>({
        resolver: yupResolver(createAdSchema),
        defaultValues: {
            productImages: [],
            name: "",
            description: "",
            is_new: "Produto novo",
            accept_trade: false,
            payment_methods: [],
            price: "",
        },
    });
    console.log(errors);
    const imageWidth = (Dimensions.get("window").width / 3 - 20) / 4;

    function handleGoBack() {
        goBack();
    }

    function handleCancel() {
        tabNavigate("MyAds");
    }

    function handleFoward(newAd: NewAdProps) {
        console.log("ola");
        stackNavigate("AdPreview", newAd);
    }

    async function selectImage() {
        const selectPhoto = await getPhoto();

        if (selectPhoto) {
            const newImage: ImagesInfoProps = {
                uri: selectPhoto.uri,
                type: String(selectPhoto.type),
                extension: String(selectPhoto.uri.split(".").pop()),
            };

            const images = getValues("productImages");

            setValue("productImages", [...images, newImage], { shouldValidate: true });
        }
    }

    function renderImages() {
        const images = getValues("productImages");

        return images.map((image) => (
            <Box
                position="relative"
                key={image.uri}
            >
                <Image
                    widthSize={imageWidth}
                    heightSize={imageWidth}
                    alt="ProductImage"
                    source={{ uri: image.uri }}
                    borderRadius="lg"
                />
                <Pressable
                    position="absolute"
                    right={1}
                    top={1}
                    onPress={() => deleteImage(image.uri)}
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

    function deleteImage(deletedImageUri: string) {
        const images = getValues("productImages");

        setValue(
            "productImages",
            images.filter((img) => img.uri !== deletedImageUri),
            { shouldValidate: true }
        );
    }

    return (
        <SafeAreaView>
            <ScrollView
                width="100%"
                showsVerticalScrollIndicator={false}
            >
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

                        <HStack
                            space={2}
                            width="100%"
                        >
                            {renderImages()}

                            <Controller
                                control={control}
                                name="productImages"
                                render={() => (
                                    <Box
                                        position="relative"
                                        width="100%"
                                    >
                                        <Pressable
                                            width={closestSizeAcceptable(imageWidth)}
                                            height={closestSizeAcceptable(imageWidth)}
                                            justifyContent="center"
                                            alignItems="center"
                                            backgroundColor="gray.500"
                                            borderRadius="md"
                                            display={
                                                getValues("productImages").length < 3
                                                    ? "flex"
                                                    : "none"
                                            }
                                            onPress={selectImage}
                                        >
                                            <Icon
                                                as={Feather}
                                                name="plus"
                                                color="gray.400"
                                            />
                                        </Pressable>

                                        <HStack
                                            width={40}
                                            display={errors.productImages ? "flex" : "none"}
                                            position="absolute"
                                            right={10}
                                            bottom="1/3"
                                            alignItems="center"
                                        >
                                            <Icon
                                                as={AntDesign}
                                                name="exclamationcircleo"
                                                color="red.500"
                                            />

                                            <Text
                                                text={errors.productImages?.message || ""}
                                                color="red.500"
                                                marginLeft={2}
                                                textAlign="left"
                                            />
                                        </HStack>
                                    </Box>
                                )}
                            />
                        </HStack>
                    </VStack>

                    <VStack marginBottom={4}>
                        <Title
                            title="Sobre o produto"
                            fontSize="md"
                            color="gray.200"
                            marginBottom={4}
                        />

                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeholder="Título do anúncio"
                                    onChangeText={onChange}
                                    value={value}
                                    fontSize="md"
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, value } }) => (
                                <TextArea
                                    placeholder="Descrição do produto"
                                    marginBottom={6}
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.description?.message}
                                    isInvalid={!!errors.description?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="is_new"
                            render={({ field: { onChange, value } }) => (
                                <RadioGroup
                                    name="isNew"
                                    options={["Produto novo", "Produto usado"]}
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </VStack>

                    <Box marginBottom={2}>
                        <Title
                            title="Venda"
                            color="gray.200"
                            fontSize="md"
                            marginBottom={2}
                        />

                        <Controller
                            control={control}
                            name="price"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeholder="Valor do produto"
                                    inputType="CURRENCY"
                                    keyboardType="numeric"
                                    onChangeText={(text: any) => {
                                        if (isNaN(text)) {
                                            return;
                                        }
                                        if (Number(text) < 0) {
                                            return;
                                        }

                                        return onChange(text);
                                    }}
                                    value={value}
                                    errorMessage={errors.price?.message}
                                />
                            )}
                        />
                    </Box>

                    <Box>
                        <Title
                            title="Aceita troca?"
                            color="gray.200"
                            fontSize="sm"
                        />

                        <Controller
                            control={control}
                            name="accept_trade"
                            render={({ field: { onChange, value } }) => (
                                <Switch
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </Box>

                    <VStack space={3}>
                        <Title
                            title="Meios de pagamento aceitos"
                            color="gray.200"
                            fontSize="sm"
                        />

                        <Controller
                            control={control}
                            name="payment_methods"
                            render={({ field: { onChange, value } }) => (
                                <CheckBox
                                    options={[
                                        { label: "Boleto", value: "boleto" },
                                        { label: "Pix", value: "pix" },
                                        { label: "Dinheiro", value: "cash" },
                                        { label: "Cartão de Crédito", value: "card" },
                                        { label: "Depósito Bancário", value: "deposit" },
                                    ]}
                                    value={value}
                                    onChange={onChange}
                                    errorMessage={errors.payment_methods?.message}
                                />
                            )}
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
                        onPress={handleSubmit(handleFoward)}
                    />
                </HStack>
            </ScrollView>
        </SafeAreaView>
    );
}
