import { Feather } from "@expo/vector-icons";
import { Box, Center, Icon, Image, Pressable, ScrollView, useToast } from "native-base";
import { useState } from "react";

import Logo from "@assets/Logo.png";
import UserPhotoDefault from "@assets/userPhotoDefault.png";

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Text } from "@components/Text";
import { Title } from "@components/Title";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import { getPhoto } from "@utils/getPhoto";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/userAuth";
import { signUpSchema } from "@schemas/signUpSchema";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Controller, useForm } from "react-hook-form";

type FormPropData = {
    name: string;
    email: string;
    tel: string;
    password: string;
    confirmPassword: string;
    avatar: string;
};

type ImageInfoProps = {
    uri: string;
    extension: string;
    type: string;
};

export function SignUp() {
    const [userPhoto, setUserPhoto] = useState<ImageInfoProps>({} as ImageInfoProps);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { signIn } = useAuth();
    const { navigate } = useNavigation<AuthNavigatorRoutesProps>();
    const toast = useToast();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormPropData>({
        resolver: yupResolver(signUpSchema),
        defaultValues: {
            confirmPassword: "",
            email: "",
            name: "",
            password: "",
            tel: "",
            avatar: "",
        },
    });

    async function handleUserPhotoSelect() {
        const photoSelect = await getPhoto();

        if (photoSelect) {
            const imageUri = photoSelect.uri;
            const imageType = String(photoSelect.type);
            const imageExtension = String(photoSelect.uri.split(".").pop());

            const imageInfo: ImageInfoProps = {
                uri: imageUri,
                type: imageType,
                extension: imageExtension,
            };

            setValue("avatar", "imageUri", { shouldValidate: true });
            setUserPhoto(imageInfo);
        }
    }

    async function handleSignUp(userData: FormPropData) {
        setIsLoading(true);

        try {
            const userPhotoInfo = {
                name: `${userData.name}.${userPhoto.type}`.toLowerCase(),
                uri: userPhoto.uri,
                type: `${userPhoto.type}/${userPhoto.extension}`,
            } as any;

            const requestBody = new FormData();
            requestBody.append("name", userData.name);
            requestBody.append("email", userData.email);
            requestBody.append("tel", userData.tel);
            requestBody.append("password", userData.password);
            requestBody.append("avatar", userPhotoInfo);

            await api.post("/users", requestBody, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            await signIn(userData.email, userData.password);
        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : "Houve um erro. Tente novamente mais tarde!";

            toast.show({ title, backgroundColor: "red.500", placement: "top" });
        } finally {
            setIsLoading(false);
        }
    }

    function goToLogin() {
        navigate("signIn");
    }

    return (
        <SafeAreaView>
            <ScrollView
                py={12}
                px={12}
                backgroundColor={"gray.600"}
                showsVerticalScrollIndicator={false}
            >
                <Center>
                    <Image
                        source={Logo}
                        alt="Logo"
                        width={16}
                        height={10}
                    />

                    <Title
                        title="Boas Vindas!"
                        fontSize="2xl"
                        marginTop={3}
                    />

                    <Text
                        text="Crie sua conta e use o espaço para comprar itens variados e vender seus produtos"
                        textAlign={"center"}
                        color={"gray.200"}
                        fontSize={"sm"}
                        marginTop={2}
                    />

                    <Center
                        marginTop={8}
                        width={"100%"}
                    >
                        <Controller
                            control={control}
                            name="avatar"
                            render={() => (
                                <Pressable
                                    position={"relative"}
                                    marginBottom={2}
                                    onPress={handleUserPhotoSelect}
                                    justifyContent="center"
                                >
                                    {!!errors.avatar && (
                                        <Text
                                            width="100%"
                                            text="Escolha a foto"
                                            fontSize="sm"
                                            color="red.500"
                                            position="absolute"
                                            top={"1/3"}
                                            left={24}
                                        />
                                    )}
                                    <Image
                                        source={
                                            userPhoto?.uri
                                                ? { uri: userPhoto.uri }
                                                : UserPhotoDefault
                                        }
                                        alt="UserPhoto"
                                        width={22}
                                        height={22}
                                        borderWidth={2}
                                        borderColor={
                                            errors.avatar !== undefined ? "red.500" : "gray.400"
                                        }
                                        borderRadius={"full"}
                                    />
                                    <Box
                                        position={"absolute"}
                                        bottom={0}
                                        right={0}
                                        backgroundColor="gray.600"
                                        borderRadius="full"
                                        width={8}
                                        height={8}
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Icon
                                            as={Feather}
                                            name="edit-3"
                                            color={"black"}
                                            size={"md"}
                                        />
                                    </Box>
                                </Pressable>
                            )}
                        />

                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Nome"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.name?.message}
                                    isInvalid={!!errors.name?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="E-mail"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.email?.message}
                                    isInvalid={!!errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="tel"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder={"Telefone"}
                                    value={value}
                                    onChangeText={onChange}
                                    isInvalid={!!errors.tel?.message}
                                    errorMessage={errors.tel?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder={errors.password?.message || "Senha"}
                                    inputType="PASSWORD"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.password?.message}
                                    isInvalid={!!errors.password?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Confirmar senha"
                                    inputType="PASSWORD"
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.confirmPassword?.message}
                                    isInvalid={!!errors.confirmPassword?.message}
                                />
                            )}
                        />

                        <Button
                            onPress={handleSubmit(handleSignUp)}
                            text="Criar"
                            buttonType="PRIMARY"
                            width={"100%"}
                            marginTop={6}
                            isLoading={isLoading}
                        />
                    </Center>

                    <Center
                        width={"100%"}
                        marginTop={12}
                        marginBottom={24}
                    >
                        <Text
                            text="Já tem uma conta?"
                            marginBottom={4}
                        />

                        <Button
                            text="Ir para o login"
                            buttonType="TERCIARY"
                            width={"100%"}
                            onPress={goToLogin}
                        />
                    </Center>
                </Center>
            </ScrollView>
        </SafeAreaView>
    );
}
