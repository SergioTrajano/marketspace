import { Karla_400Regular, Karla_700Bold, useFonts } from "@expo-google-fonts/karla";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";

import { Loading } from "@components/Loading";
import { Routes } from "@routes/index";

import { AuthContextProvider } from "@contexts/AuthContext";
import { THEME } from "./src/theme";

export default function App() {
    const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

    return (
        <NativeBaseProvider theme={THEME}>
            <StatusBar
                translucent
                backgroundColor="#EDECEE"
                barStyle="dark-content"
            />
            <AuthContextProvider>{fontsLoaded ? <Routes /> : <Loading />}</AuthContextProvider>
        </NativeBaseProvider>
    );
}
