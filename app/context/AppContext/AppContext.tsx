import React, { createContext, useEffect, useReducer, useState } from 'react'
import { getFavoritesPokemon } from '../../helpers/favoritesFunctions';
import { useGetAllPokemons } from '../../hooks/useGetAllPokemons';
import { SimplePokemon } from '../../interfaces/pokemonInterfaces';
import { appReducer } from './appReducer';

//* Define information
export interface AppState {
    pokemonList: SimplePokemon[];
    pokemonListFavorites: string[];
}

//* Initial State
const appStateInitial: AppState = {
    pokemonList: [],
    pokemonListFavorites: [],
}

//* Definition and what must export my context
interface AppContextProps {
    appState: AppState;
    isFetching: boolean;
    addFavoritePokemon: (newPokemonIdList: string[]) => void;
    removeFavoritePokemon: (newPokemonIdList: string) => void;
    emptyFavoritePokemon: () => void;
}

//* Create context
const AppContext = createContext({} as AppContextProps);

//* Component that provide my state
const AppProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const { isFetching, getPokemons } = useGetAllPokemons();
    const [appState, dispatch] = useReducer(appReducer, appStateInitial);

    const setFavoritePokemonsList = async () => {
        const favoritePokemons = await getFavoritesPokemon();

        if (favoritePokemons && favoritePokemons.length === 0) {
            dispatch({
                type: 'charge-favorite-pokemons-list',
                payload: favoritePokemons,
            })
        }
    }

    useEffect(() => {
        if (appState.pokemonList.length === 0) {
            getPokemons.then(pokemons => {
                dispatch({
                    type: 'charge-all-pokemons',
                    payload: pokemons,
                })
            })
        } else {
            dispatch({
                type: 'charge-all-pokemons',
                payload: appState.pokemonList,
            })
        }

        setFavoritePokemonsList();
    }, [appState.pokemonListFavorites]);

    const addFavoritePokemon = (newPokemonIdList: string[]) => {
        dispatch({
            type: 'add-favorite-pokemon',
            payload: newPokemonIdList,
        })
    }

    const removeFavoritePokemon = (newPokemonIdList: string) => {
        dispatch({
            type: 'delete-favorite-pokemon',
            payload: newPokemonIdList,
        })
    }

    const emptyFavoritePokemon = () => {
        dispatch({
            type: 'empty-favorite-pokemon',
        })
    }

    return (
        <AppContext.Provider value={{
            appState,
            isFetching,
            addFavoritePokemon,
            removeFavoritePokemon,
            emptyFavoritePokemon,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext };