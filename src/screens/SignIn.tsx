import { Center, Image, VStack, useToast } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Text } from "@components/Text";
import { Title } from "@components/Title";

import Logo from "@assets/Logo.png";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/userAuth";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { signInSchema } from "@schemas/signInSchema";
import { AppError } from "@utils/AppError";
import { AxiosError } from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type SignInProps = {
    email: string;
    password: string;
};

export function SignIn() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

    const { signIn } = useAuth();
    const toast = useToast();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInProps>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(signInSchema),
    });

    async function handleSignIn(user: SignInProps) {
        setIsLoading(true);
        try {
            await signIn(user.email, user.password);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const isAxiosError = error instanceof AxiosError;

            let title = isAppError ? error.message : "Houve um erro. Tente novamente mais tarde!";

            if (isAxiosError) {
                title = error.response.data.message;
            }

            toast.show({ title, backgroundColor: "red.500", placement: "top" });
        } finally {
            setIsLoading(false);
        }
    }

    function handleNewAccount() {
        navigate("signUp");
    }

    return (
        <SafeAreaView>
            <VStack height={"100%"}>
                <Center
                    backgroundColor="gray.600"
                    py={16}
                    borderBottomRadius="2xl"
                >
                    <Image
                        source={Logo}
                        alt="Logo"
                        height={20}
                    />

                    <Title
                        title="marketspace"
                        fontSize={"4xl"}
                        marginTop={4}
                    />

                    <Text
                        text="Seu espaço de compra e venda"
                        color="gray.300"
                        fontSize="sm"
                    />

                    <Center
                        marginTop={20}
                        width="100%"
                        px={12}
                    >
                        <Text
                            text="Acesse sua conta"
                            color="gray.200"
                            fontSize="sm"
                            marginBottom={4}
                        />

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeholder="E-mail"
                                    height={11}
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeholder="Senha"
                                    inputType="PASSWORD"
                                    height={11}
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />

                        <Button
                            onPress={handleSubmit(handleSignIn)}
                            isLoading={isLoading}
                            buttonType="SECONDARY"
                            text="Entrar"
                            height={11}
                            minWidth="100%"
                            marginTop={4}
                        />
                    </Center>
                </Center>

                <Center
                    marginTop={12}
                    px={16}
                >
                    <Text
                        text="Ainda não tem acesso?"
                        marginBottom={4}
                    />
                    <Button
                        buttonType="TERCIARY"
                        text="Criar uma conta"
                        width="100%"
                        height={11}
                        onPress={handleNewAccount}
                    />
                </Center>
            </VStack>
        </SafeAreaView>
    );
}
