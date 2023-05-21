import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Box, useTheme } from "native-base";

import { useAuth } from "@hooks/userAuth";

import { Loading } from "@components/Loading";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
    const { user, isLoadingStorageData } = useAuth();

    const { colors } = useTheme();

    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];

    function renderRoutes() {
        if (isLoadingStorageData) {
            return <Loading />;
        }
        if (user.id) {
            return <AppRoutes />;
        }

        return <AuthRoutes />;
    }

    return (
        <Box
            flex={1}
            backgroundColor={colors.gray[700]}
        >
            <NavigationContainer theme={theme}>{renderRoutes()}</NavigationContainer>
        </Box>
    );
}
