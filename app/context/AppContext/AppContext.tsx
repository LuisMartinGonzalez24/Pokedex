import React, { createContext } from 'react'
import { useGetAllPokemons } from '../../hooks/useGetAllPokemons';
import { SimplePokemon } from '../../interfaces/pokemonInterfaces';

//* Definition and what must export my context
interface AppContextProps {
    pokemonList: SimplePokemon[];
    isFetching: boolean;
}

//* Create context
const AppContext = createContext({} as AppContextProps);

//* Component that provide my state
const AppProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const { isFetching, pokemonList } = useGetAllPokemons();

    return (
        <AppContext.Provider value={{
            pokemonList,
            isFetching,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext };