import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
    createNativeStackNavigator,
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Icon, useTheme } from "native-base";
import { Platform } from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";

import { useAuth } from "@hooks/userAuth";

import { AdDetails } from "@screens/AdDetails";
import { AdPreview } from "@screens/AdPreview";
import { CreateAd } from "@screens/CreateAd";
import { EditAd } from "@screens/EditAd";
import { Home } from "@screens/Home";
import { MyAdDetails } from "@screens/MyAdDetails";
import { MyAds } from "@screens/MyAds";
import { useEffect } from "react";

type TabRoutesProps = {
    Tabs: undefined;
    MyAds: undefined;
    LogOut: undefined;
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

    const { LogOut } = useAuth();

    const { sizes, colors } = useTheme();

    function TabsRoutes() {
        return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: colors.black,
                    tabBarInactiveTintColor: colors.gray[400],
                    tabBarStyle: {
                        backgroundColor: colors.white,
                        borderTopWidth: 0,
                        height: Platform.OS === "android" ? "auto" : 69,
                        paddingBottom: sizes[6],
                        paddingTop: sizes[6],
                    },
                }}
            >
                <Tab.Screen
                    name="Tabs"
                    component={Home}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                as={Octicons}
                                name="home"
                                size={"xl"}
                                color={color}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="MyAds"
                    component={MyAds}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                as={Octicons}
                                name="tag"
                                size={"xl"}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="LogOut"
                    component={() => (
                        <>
                            {useEffect(() => {
                                LogOut();
                            }, [])}
                        </>
                    )}
                    options={{
                        tabBarIcon: () => (
                            <Icon
                                as={Ionicons}
                                name="ios-exit-outline"
                                color={"red.400"}
                                size={"xl"}
                            />
                        ),
                    }}
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
