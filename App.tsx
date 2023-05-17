import { StatusBar } from "react-native";
import { useFonts, Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla";
import { NativeBaseProvider } from "native-base";

import { Loading } from "@components/Loading";
import { Routes } from "@routes/index";

import { THEME } from "./src/theme";
import { AuthContextProvider } from "@contexts/AuthContext";

export default function App() {
    const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

    return (
        <NativeBaseProvider theme={THEME}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            <AuthContextProvider>{fontsLoaded ? <Routes /> : <Loading />}</AuthContextProvider>
        </NativeBaseProvider>
    );
}
