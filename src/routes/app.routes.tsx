import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useTheme } from "native-base";
import { Platform } from "react-native";

import { AdDetails } from "@screens/AdDetails";
import { AdPreview } from "@screens/AdPreview";
import { CreateAd } from "@screens/CreateAd";
import { EditAd } from "@screens/EditAd";
import { Home } from "@screens/Home";
import { MyAdDetails } from "@screens/MyAdDetails";
import { MyAds } from "@screens/MyAds";

type TabRoutesProps = {
    Tabs: undefined;
    MyAds: undefined;
};

type StackRoutesProps = {
    Home: undefined;
    AdDetails: undefined;
    AdPreview: undefined;
    CreateAd: undefined;
    EditAd: undefined;
    MyAdDetails: undefined;
};

export type AppTabProps = BottomTabNavigationProp<TabRoutesProps>;
export type AppStackProps = NativeStackNavigationProp<StackRoutesProps>;

export function AppRoutes() {
    const Stack = createNativeStackNavigator<StackRoutesProps>();
    const Tab = createBottomTabNavigator<TabRoutesProps>();

    const { sizes, colors } = useTheme();

    const iconSize = sizes[6];

    function TabsRoutes() {
        return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: colors.green[500],
                    tabBarInactiveTintColor: colors.gray[200],
                    tabBarStyle: {
                        backgroundColor: colors.gray[600],
                        borderTopWidth: 0,
                        height: Platform.OS === "android" ? "auto" : 69,
                        paddingBottom: sizes[10],
                        paddingTop: sizes[6],
                    },
                }}
            >
                <Tab.Screen
                    name="Tabs"
                    component={Home}
                />

                <Tab.Screen
                    name="MyAds"
                    component={MyAds}
                />
            </Tab.Navigator>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Home"
                component={TabsRoutes}
            />
            <Stack.Screen
                name="AdDetails"
                component={AdDetails}
            />
            <Stack.Screen
                name="AdPreview"
                component={AdPreview}
            />
            <Stack.Screen
                name="CreateAd"
                component={CreateAd}
            />
            <Stack.Screen
                name="EditAd"
                component={EditAd}
            />
            <Stack.Screen
                name="MyAdDetails"
                component={MyAdDetails}
            />
        </Stack.Navigator>
    );
}
