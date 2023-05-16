import { Center, Button as NativeButton, Image, ScrollView, Box, Icon } from "native-base";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import Logo from "@assets/Logo.png";
import UserPhotoDefault from "@assets/userPhotoDefault.png";

import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "@components/Title";
import { Text } from "@components/Text";
import { Avatar } from "@components/Avatar";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { useNavigation } from "@react-navigation/native";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { useState } from "react";

export function SignUp() {
    const [userPhoto, setUserPhoto] = useState<string>("");

    const { navigate } = useNavigation<AuthNavigatorRoutesProps>();

    function handleLogin() {
        navigate("signIn");
    }

    async function handleUserPhotoSelect() {
        const photoSelected = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            aspect: [4, 4],
            allowsEditing: true,
        });

        if (photoSelected.canceled) {
            return;
        }

        if (photoSelected.assets[0].uri) {
            setUserPhoto(photoSelected.assets[0].uri);
        }
    }

    return (
        <SafeAreaView>
            <ScrollView
                height="100%"
                py={12}
                px={12}
                backgroundColor={"gray.600"}
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
                        <Box position={"relative"}>
                            <Image
                                source={userPhoto ? { uri: userPhoto } : UserPhotoDefault}
                                alt="UserPhoto"
                                width={22}
                                height={22}
                                borderWidth={2}
                                borderColor={"gray.400"}
                                borderRadius={"full"}
                            />
                            <NativeButton
                                width={8}
                                height={8}
                                borderRadius={"3xl"}
                                position={"absolute"}
                                bottom={0}
                                left={12}
                                backgroundColor={"white"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                onPress={handleUserPhotoSelect}
                            >
                                <Icon
                                    as={Feather}
                                    name="edit-3"
                                    color={"black"}
                                    size={"md"}
                                />
                            </NativeButton>
                        </Box>

                        <Input
                            placeholder="Nome"
                            marginTop={4}
                        />
                        <Input placeholder="E-mail" />
                        <Input placeholder="Telefone" />
                        <Input
                            placeholder="Senha"
                            inputType="PASSWORD"
                        />
                        <Input
                            placeholder="Confirmar senha"
                            inputType="PASSWORD"
                        />

                        <Button
                            text="Criar"
                            buttonType="PRIMARY"
                            width={"100%"}
                            marginTop={6}
                        />
                    </Center>

                    <Center
                        width={"100%"}
                        marginTop={12}
                    >
                        <Text
                            text="Já tem uma conta?"
                            marginBottom={4}
                        />

                        <Button
                            text="Ir para o login"
                            buttonType="TERCIARY"
                            width={"100%"}
                            onPress={handleLogin}
                        />
                    </Center>
                </Center>
            </ScrollView>
        </SafeAreaView>
    );
}
