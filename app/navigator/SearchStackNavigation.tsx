import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen/PokemonDetailsScreen';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

export type RootSearchStackParams = {
    searchScreen: undefined;
    pokemonDetailsScreen: {
        pokemon: SimplePokemon;
        backgroundColor: string;
    }
};

const SearchStack = createStackNavigator<RootSearchStackParams>();

export const SearchStackNavigation = () => {
    return (
        <SearchStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName={'searchScreen'}
        >
            <SearchStack.Screen name={'searchScreen'} component={SearchScreen} />
            <SearchStack.Screen name={'pokemonDetailsScreen'} component={PokemonDetailsScreen} />
        </SearchStack.Navigator>
    )
}