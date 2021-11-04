import React, { useEffect, useState, useRef } from "react";
import { pokemonApi } from "../api/pokemonAPI";
import { PokemonPaginatorResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';

export const useGetAllPokemons = () => {

    const [pokemonList, setpokemonList] = useState<SimplePokemon[]>([]);
    const [isFetching, setisFetching] = useState(true);
    const pokemonApiRef = useRef<string>('https://pokeapi.co/api/v2/pokemon?limit=1180').current;

    useEffect(() => {
        getPokemons();
    }, []);

    const getIdFromURL = React.useCallback(
        (url: string): string => {
            const URLParts = url.split('/');
            const id = URLParts[URLParts.length - 2];
            return id;
        }, []
    );

    const getPictureURL = (id: string): string => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    const mapPokemonList = React.useCallback((pokemonListResult: Result[]) => {
        const newPokemonList: SimplePokemon[] = pokemonListResult.map(pokemon => {
            const id = getIdFromURL(pokemon.url);
            const pictureURL = getPictureURL(id);

            return { id, name: pokemon.name, pictureURL }
        });

        setpokemonList(newPokemonList);
        setisFetching(false);
    }, []);

    const getPokemons = async () => {
        try {
            //console.log('Comienza de carga de pokemons', nextPageURL.current);
            const response = await pokemonApi.get<PokemonPaginatorResponse>(pokemonApiRef);
            mapPokemonList(response.data.results);
            //console.log('Fin de carga de pokemons');
        } catch (error) {
            console.log('getPokemons error: ', error)
        }
    };

    return {
        isFetching,
        pokemonList,
    };
}
