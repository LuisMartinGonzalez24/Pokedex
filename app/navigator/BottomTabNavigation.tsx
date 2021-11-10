import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { themeContext } from "../context/ThemeContext/ThemeContext";
import { HomeStackNavigation } from "./HomeStackNavigation";
import { SearchStackNavigation } from "./SearchStackNavigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FavoritesStackNavigation } from "./FavoritesStackNavigation";

export type RootBottomTabParams = {
    bottomTabHome: undefined;
    bottomTabSearchScreen: undefined;
    bottomTabFavoritesScreen: undefined;
};

const BottomTab = createBottomTabNavigator<RootBottomTabParams>();

export const BottomTabNavigation = () => {

    const { themeState: { dark, colors } } = useContext(themeContext);

    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: dark ? '#1dd1a1' : colors.text,
                tabBarInactiveTintColor: 'grey',
                tabBarStyle: {
                    borderWidth: 0,
                    backgroundColor: dark ? 'rgba(0,0,0, 0.89)' : 'rgba(255,255,255, 0.85)',
                    elevation: 0,
                    position: 'absolute',
                },

                tabBarIcon: (({ color, }) => {
                    switch (route.name) {
                        case 'bottomTabHome':
                            return (
                                <Icon
                                    name={'home-outline'}
                                    size={30}
                                    color={color}
                                />
                            );

                        case 'bottomTabFavoritesScreen':
                            return (
                                <Icon
                                    name={'heart-outline'}
                                    size={30}
                                    color={color}
                                />
                            );

                        case 'bottomTabSearchScreen':
                            return (
                                <Icon
                                    name={'magnify'}
                                    size={30}
                                    color={color}
                                />
                            );

                        default:
                            return (
                                <Icon
                                    name={'crosshairs-question'}
                                    size={35}
                                    color={color}
                                />
                            )
                    }
                })
            })}
            safeAreaInsets={{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}
            initialRouteName={'bottomTabHome'}
        >
            <BottomTab.Screen
                name="bottomTabHome"
                component={HomeStackNavigation}
            />

            <BottomTab.Screen
                name="bottomTabFavoritesScreen"
                component={FavoritesStackNavigation}
            />

            <BottomTab.Screen
                name="bottomTabSearchScreen"
                component={SearchStackNavigation}
            />
        </BottomTab.Navigator>
    );
}