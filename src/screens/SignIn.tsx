import { Center, Image, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { Title } from "@components/Title";
import { Text } from "@components/Text";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import Logo from "@assets/Logo.png";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignIn() {
    const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

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

                        <Input
                            placeholder="E-mail"
                            height={11}
                        />

                        <Input
                            placeholder="Senha"
                            inputType="PASSWORD"
                            height={11}
                        />

                        <Button
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
