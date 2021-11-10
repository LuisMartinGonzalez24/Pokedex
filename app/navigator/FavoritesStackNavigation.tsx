import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen/PokemonDetailsScreen';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';
import FavoritesScreen from '../screens/FavoritesScreen/FavoritesScreen';

export type RootFavoritesStackParams = {
    favoriteScreen: undefined;
    pokemonDetailsScreen: {
        pokemon: SimplePokemon;
        backgroundColor: string;
    }
};

const FavoritesStack = createStackNavigator<RootFavoritesStackParams>();

export const FavoritesStackNavigation = () => {
    return (
        <FavoritesStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'favoriteScreen'}
        >
            <FavoritesStack.Screen name={'favoriteScreen'} component={FavoritesScreen} />
            <FavoritesStack.Screen name={'pokemonDetailsScreen'} component={PokemonDetailsScreen} />
        </FavoritesStack.Navigator>
    )
}