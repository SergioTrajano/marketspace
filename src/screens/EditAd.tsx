import { Button } from "@components/Button";
import { Image } from "@components/Image";
import { Input } from "@components/Input";
import { RadioGroup } from "@components/RadioGroup";
import { Switch } from "@components/Switch";
import { Title } from "@components/Title";
import { Box, Center, HStack, Icon, Pressable, ScrollView, VStack, useToast } from "native-base";

import { Text } from "@components/Text";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { AppStackProps } from "@routes/app.routes";
import { getPhoto } from "@utils/getPhoto";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CheckBox } from "@components/CheckBox";
import { Loading } from "@components/Loading";
import { TextArea } from "@components/TextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/userAuth";
import { createAdSchema } from "@schemas/createAdSchema";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { closestSizeAcceptable } from "@utils/closestSizeAcceptableInNativeBase";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type UploadedImagePros = {
    uri: string;
    type: string;
    extension: string;
    id?: string;
};

export type Payment_method = "pix" | "card" | "deposit" | "cash" | "boleto";

export type ProductProps = {
    productImages: UploadedImagePros[];
    name: string;
    description: string;
    is_new: "Produto novo" | "Produto usado";
    accept_trade: boolean;
    payment_methods: Payment_method[];
    price: string;
};

export function EditAd() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [imagesToDeleteIds, setImagesToDeleteIds] = useState<string[]>([] as string[]);

    const route = useRoute();
    const { productId } = route.params as { productId: string };

    const { user } = useAuth();

    const toast = useToast();

    const { goBack, navigate } = useNavigation<AppStackProps>();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<ProductProps>({
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

    const imageWidth = (Dimensions.get("window").width / 3 - 20) / 4;

    function handleGoBack() {
        goBack();
    }

    async function handleEdit(product: ProductProps) {
        setIsEditing(true);

        try {
            const productRequestBody = {
                name: product.name,
                description: product.description,
                is_new: product.is_new === "Produto novo" ? true : false,
                price: Math.floor(Number(product.price) * 100),
                accept_trade: product.accept_trade,
                payment_methods: product.payment_methods,
            };

            await api.put(`/products/${productId}`, productRequestBody);

            const imagesToUploadToServer = product.productImages.filter(
                (imageData) => imageData.id === undefined
            );

            if (imagesToUploadToServer.length) {
                const productimagesRequestBody = new FormData();
                productimagesRequestBody.append("product_id", productId);

                imagesToUploadToServer.forEach((imageData) => {
                    const photoFile = {
                        name: `${user.name}.${imageData.extension}`.toLowerCase(),
                        uri: imageData.uri,
                        type: `${imageData.type}/${imageData.extension}`,
                    } as any;

                    productimagesRequestBody.append("images", photoFile);
                });

                await api.post("/products/images", productimagesRequestBody, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }
            if (imagesToDeleteIds.length) {
                await api.delete(`/products/images?ids=${JSON.stringify(imagesToDeleteIds)}`);
            }

            navigate("MyAdDetails", { productId });
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError
                ? error.message
                : "Houve um erro na atualização do produto. Tente novamente mais tarde!";

            toast.show({ title, backgroundColor: "red.500", placement: "top" });

            setIsEditing(false);
        }
    }

    async function selectImage() {
        const selectPhoto = await getPhoto();

        if (selectPhoto) {
            const newImage: UploadedImagePros = {
                uri: selectPhoto.uri,
                type: String(selectPhoto.type),
                extension: String(selectPhoto.uri.split(".").pop()),
                id: undefined,
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

    async function deleteImage(deletedImageUri: string) {
        const insertedImages = getValues("productImages");

        const deletedImageId = insertedImages.find((img) => img.uri === deletedImageUri)?.id || "";
        if (deletedImageId) {
            setImagesToDeleteIds([...imagesToDeleteIds, deletedImageId]);
        }

        setValue(
            "productImages",
            insertedImages.filter((img) => img.uri !== deletedImageUri),
            { shouldValidate: true }
        );
    }

    useFocusEffect(
        useCallback(() => {
            loadProduct();
        }, [])
    );

    async function loadProduct() {
        try {
            const { data } = await api.get(`products/${productId}`);

            setValue("accept_trade", data.accept_trade, { shouldValidate: true });
            setValue("description", data.description, { shouldValidate: true });
            setValue("is_new", data.is_new ? "Produto novo" : "Produto usado", {
                shouldValidate: true,
            });
            setValue("name", data.name, { shouldValidate: true });
            setValue(
                "payment_methods",
                data.payment_methods.map((method: { key: string }) => method.key),
                { shouldValidate: true }
            );
            setValue("price", (data.price / 100).toFixed(2), { shouldValidate: true });
            setValue(
                "productImages",
                data.product_images.map((image: { id: string; path: string }) => {
                    const img = {
                        uri: `${api.defaults.baseURL}/images/${image.path}`,
                        type: "image",
                        extension: image.path.split(".").pop(),
                        id: image.id,
                    };

                    return img;
                }),
                { shouldValidate: true }
            );

            setIsLoading(false);
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError
                ? error.message
                : "Houve um erro na obtenção dos dados do produto. Tente novamente mais tarde!";

            toast.show({ title, backgroundColor: "red.500", placement: "top" });

            goBack();
        }
    }

    if (isLoading) {
        return <Loading />;
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
                            isDisabled={isEditing}
                        >
                            <Icon
                                as={Feather}
                                name="arrow-left"
                                color="gray.100"
                                size="xl"
                            />
                        </Pressable>

                        <Title
                            title="Editar anúncio"
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
                                    h={40}
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
                                    onToggle={onChange}
                                    value={value}
                                    isChecked={value}
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
                        onPress={handleGoBack}
                        isDisabled={isEditing}
                    />
                    <Button
                        text="Editar"
                        buttonType="PRIMARY"
                        flex={1}
                        onPress={handleSubmit(handleEdit)}
                        isLoading={isEditing}
                    />
                </HStack>
            </ScrollView>
        </SafeAreaView>
    );
}
