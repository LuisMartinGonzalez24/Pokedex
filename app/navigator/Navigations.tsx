import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import PokemonDetailsScreen from '../screens/PokemonDetailsScreen/PokemonDetailsScreen';
import { themeContext } from '../context/ThemeContext';
import { SimplePokemon } from '../interfaces/pokemonInterfaces';

export type RootStackParams = {
    homeScreen: undefined;
    pokemonDetailsScreen: {
        pokemon: SimplePokemon;
        backgroundColor: string;
    };
}

const Stack = createStackNavigator<RootStackParams>();

const Navigations = () => {

    const { themeState } = useContext(themeContext);

    return (
        <NavigationContainer theme={themeState}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName={'homeScreen'}
            >
                <Stack.Screen name={'homeScreen'} component={HomeScreen} />
                <Stack.Screen name={'pokemonDetailsScreen'} component={PokemonDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigations;