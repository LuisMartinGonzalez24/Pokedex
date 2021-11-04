import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { themeContext } from "../context/ThemeContext";
import { HomeStackNavigation } from "./HomeStackNavigation";
import { SearchStackNavigation } from "./SearchStackNavigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export type RootBottomTabParams = {
    bottomTabHome: undefined;
    bottomTabSearchScreen: undefined;
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
                                    name={'home'}
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
            initialRouteName={'bottomTabHome'}
        >
            <BottomTab.Screen
                name="bottomTabHome"
                component={HomeStackNavigation}
            />

            <BottomTab.Screen
                name="bottomTabSearchScreen"
                component={SearchStackNavigation}
            />
        </BottomTab.Navigator>
    );
}