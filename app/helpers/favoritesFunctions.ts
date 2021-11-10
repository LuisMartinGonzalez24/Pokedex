import AsyncStorage from '@react-native-async-storage/async-storage';
const favoriteKey = 'favorites-pokemon';

const saveFavoritePokemon = async (id: string) => {

    console.log('saving pokemon');
    const listPokemonsId = await getFavoritesPokemon();

    try {
        let favoritesPokemons: string;

        if (listPokemonsId.length === 0) {
            listPokemonsId.push(id);
            favoritesPokemons = JSON.stringify(listPokemonsId);
        } else {
            if (listPokemonsId.includes(id)) {
                favoritesPokemons = JSON.stringify(listPokemonsId);
            } else {
                listPokemonsId.push(id);
                favoritesPokemons = JSON.stringify(listPokemonsId);
            }
        }

        await AsyncStorage.setItem(favoriteKey, favoritesPokemons);

    } catch (ex) {
        console.log('error to save favorite pokemon: ', ex);
    }
};

const deleteFavoritePokemon = async (id: string) => {

    console.log('deleting pokemon');
    const listPokemonsId = await getFavoritesPokemon();

    try {
        const favoritesPokemons = listPokemonsId.filter(pokemonId => pokemonId !== id);
        await AsyncStorage.setItem(favoriteKey, JSON.stringify(favoritesPokemons));
    } catch (ex) {
        console.log('error to save favorite pokemon: ', ex);
    }
};

const getFavoritesPokemon = async (): Promise<string[]> => {
    try {
        const listPokemonsId = await AsyncStorage.getItem(favoriteKey);

        if (
            listPokemonsId !== null &&
            listPokemonsId.length > 0
        ) {
            return JSON.parse(listPokemonsId);
        } else {
            return [];
        }

    } catch (ex) {
        throw new Error('error to get favorites pokemons: ' + ex);
    }
}

const deleteAllFavoritePokemons = async () => {
    try {
        await AsyncStorage.removeItem(favoriteKey);
    } catch (ex) {
        throw new Error('error to get favorites pokemons: ' + ex);
    }
}

export { 
    saveFavoritePokemon, deleteFavoritePokemon, getFavoritesPokemon, deleteAllFavoritePokemons 
};