import { SimplePokemon } from "../../interfaces/pokemonInterfaces";
import { AppState } from "./AppContext";

type AppReducerTypes =
    | {
        type: 'charge-pokemons',
        payload: {
            pokemons: SimplePokemon[],
            favoritePokemons: string[]
        }
    }
    | { type: 'add-favorite-pokemon', payload: string[] }
    | { type: 'delete-favorite-pokemon', payload: string }
    | { type: 'empty-favorite-pokemon' };

export const appReducer = (state: AppState, action: AppReducerTypes): AppState => {

    switch (action.type) {
        case 'charge-pokemons':
            return {
                ...state,
                pokemonList: action.payload.pokemons.map(pokemon => {
                    return {
                        ...pokemon,
                        isFavorite: action.payload.favoritePokemons.includes(pokemon.id)
                    }
                }),
                pokemonListFavorites: action.payload.favoritePokemons,
            }

        case 'add-favorite-pokemon':
            return {
                ...state,
                pokemonList: state.pokemonList.map(pokemon => {
                    return { ...pokemon, isFavorite: action.payload.includes(pokemon.id) }
                }),
                pokemonListFavorites: action.payload,
            };

        case 'delete-favorite-pokemon':
            return {
                ...state,
                pokemonList: state.pokemonList.map(pokemon =>
                    pokemon.id === action.payload ? { ...pokemon, isFavorite: false } : pokemon
                ),
                pokemonListFavorites: state.pokemonListFavorites.filter(
                    pokemonId => pokemonId !== action.payload
                ),
            };

        case 'empty-favorite-pokemon':
            return {
                ...state,
                pokemonList: state.pokemonList.map(pokemon => {
                    return { ...pokemon, isFavorite: false }
                }),
                pokemonListFavorites: [],
            }

        default:
            return state;
    }
}
