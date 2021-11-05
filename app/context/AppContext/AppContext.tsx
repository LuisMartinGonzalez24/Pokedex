import React, { createContext, useState, useEffect } from 'react'
import { getAllPokemons } from '../../hooks/getAllPokemons';
import { useGetAllPokemons } from '../../hooks/useGetAllPokemons';
import { SimplePokemon } from '../../interfaces/pokemonInterfaces';

//* Information that i want to expose
interface AppContextProps {
    pokemonListState: SimplePokemon [];
    addMorePokemons: () => void;
    isFetching: boolean;
}

const AppContext = createContext({} as AppContextProps);

const AppProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const { isFetching, pokemonList } = useGetAllPokemons();
    const [pokemonListState, setpokemonListState] = useState<SimplePokemon[]>([])

    useEffect(() => {
        // getPokemons();
        
        if (isFetching === false) {
            const pokemons: SimplePokemon[] = [];

            for (let i = 0; i < 20; i++) {
                pokemons.push(pokemonList[i]);
            }

            setpokemonListState(pokemons);
        }
        
    }, [isFetching]);

    const addMorePokemons = () => {        
        const newPokemonList: SimplePokemon[] = [];
        const cantityOnCurrentList: number = pokemonListState.length;
        const iterator: number = cantityOnCurrentList  + 20;

        for (let i = 0; i < iterator; i++) {
            newPokemonList.push(pokemonList[i]);
        }

        setpokemonListState(newPokemonList);
    }

    return (
        <AppContext.Provider value={{
            pokemonListState,
            addMorePokemons,
            isFetching,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export {AppProvider, AppContext};