import { useFonts, Karla_400Regular, Karla_700Bold } from "@expo-google-fonts/karla";
import { Box, NativeBaseProvider, Text } from "native-base";

import { THEME } from "./src/theme";

export default function App() {
    const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

    return (
        <NativeBaseProvider theme={THEME}>
            <Box
                marginTop={200}
                marginLeft={100}
                backgroundColor={"black"}
            >
                <Text
                    color={"red.400"}
                    lineHeight="md"
                >
                    Ola mundo
                </Text>
            </Box>
        </NativeBaseProvider>
    );
}
