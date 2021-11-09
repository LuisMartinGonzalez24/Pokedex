import { SimplePokemon } from "../../interfaces/pokemonInterfaces";
import { AppState } from "./AppContext";

type AppReducerTypes =
    | { type: 'charge-all-pokemons', payload: SimplePokemon[] }
    | { type: 'charge-favorite-pokemons-list', payload: string[] }
    | { type: 'add-favorite-pokemon', payload: string[] }
    | { type: 'delete-favorite-pokemon', payload: string[] };

export const appReducer = (state: AppState, action: AppReducerTypes): AppState => {

    switch (action.type) {

        case 'charge-all-pokemons':
            return {
                ...state,
                pokemonList: action.payload,
            }


        case 'charge-favorite-pokemons-list':
            return {
                ...state,                
                pokemonListFavorites: action.payload,
            }

        case 'add-favorite-pokemon':

            return {
                ...state,
                pokemonList: state.pokemonList.map(pokemon =>  {
                    return {...pokemon, isFavorite: action.payload.includes(pokemon.id)}
                }),
                pokemonListFavorites: action.payload,
            };

        case 'delete-favorite-pokemon':

            return {
                ...state,
                pokemonList: state.pokemonList.map(pokemon =>  {
                    return {...pokemon, isFavorite: action.payload.includes(pokemon.id)}
                }),
                pokemonListFavorites: action.payload,
            };

        default:
            return state;
    }
}
