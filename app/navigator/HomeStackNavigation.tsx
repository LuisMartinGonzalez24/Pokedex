import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen/PokemonDetailsScreen';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

export type RootHomeStackParams = {
    homeScreen: undefined;
    pokemonDetailsScreen: {
        pokemon: SimplePokemon;
        backgroundColor: string;
    };
};

const HomeStack = createStackNavigator<RootHomeStackParams>();

export const HomeStackNavigation = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'homeScreen'}
        >
            <HomeStack.Screen name={'homeScreen'} component={HomeScreen} />
            <HomeStack.Screen name={'pokemonDetailsScreen'} component={PokemonDetailsScreen} />
        </HomeStack.Navigator>
    )

}