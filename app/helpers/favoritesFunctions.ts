import AsyncStorage from '@react-native-async-storage/async-storage';

const saveFavoritePokemon = async (id: string) => {
    
    console.log('saving pokemon');
    const listPokemonsId = await getFavoritesPokemon();

    try {
        let favoritesPokemons: string;

        if (listPokemonsId.length === 0) {
            listPokemonsId.push(id);
            favoritesPokemons = JSON.stringify(listPokemonsId);
        } else {
            listPokemonsId.push(id);
            favoritesPokemons = JSON.stringify(listPokemonsId);
        }

        await AsyncStorage.setItem('favorites-pokemon', favoritesPokemons);

    } catch (ex) {
        console.log('error to save favorite pokemon: ', ex);
    }
};

const deleteFavoritePokemon = async (id: string) => {

    console.log('deleting pokemon');
    const listPokemonsId = await getFavoritesPokemon();

    try {
        const favoritesPokemons = listPokemonsId.filter(pokemonId => pokemonId !== id);        
        await AsyncStorage.setItem('favorites-pokemon', JSON.stringify(favoritesPokemons));
    } catch (ex) {
        console.log('error to save favorite pokemon: ', ex);
    }
};

const getFavoritesPokemon = async (): Promise<string[]> => {
    try {
        const listPokemonsId = await AsyncStorage.getItem('favorites-pokemon');

        if (listPokemonsId !== null) {
            return JSON.parse(listPokemonsId);
        } else {
            return [];
        }

    } catch (ex) {
        throw new Error('error to get favorites pokemons: ' + ex);
    }
}

const seePokemonsIdList = async () => {
    try {
        const listPokemonsId = await AsyncStorage.getItem('favorites-pokemon');

        if (listPokemonsId !== null) {
            console.log('id list: ', JSON.parse(listPokemonsId));
        } else {
            console.log('empty id list');
        }

    } catch (ex) {
        console.log('error to get favorites pokemons: ' + ex);
    }
}

export { saveFavoritePokemon, deleteFavoritePokemon, getFavoritesPokemon, seePokemonsIdList };