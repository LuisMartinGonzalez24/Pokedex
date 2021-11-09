import React, { useState, useRef } from "react";
import { pokemonApi } from "../api/pokemonAPI";
import { getFavoritesPokemon } from "../helpers/favoritesFunctions";
import { PokemonPaginatorResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';

export const useGetAllPokemons = () => {

    const [isFetching, setisFetching] = useState(true);
    const pokemonApiRef = useRef<string>('https://pokeapi.co/api/v2/pokemon?limit=1180').current;

    const getIdFromURL = React.useCallback(
        (url: string): string => {
            const URLParts = url.split('/');
            const id = URLParts[URLParts.length - 2];
            return id;
        }, []
    );

    const getPictureURL = (id: string): string => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    const mapPokemonList = React.useCallback(async (pokemonListResult: Result[]) => {

        const favoritePokemonsIdList = await getFavoritesPokemon();

        const newPokemonList: SimplePokemon[] = pokemonListResult.map(pokemon => {
            const id = getIdFromURL(pokemon.url);
            const pictureURL = getPictureURL(id);

            return { id, name: pokemon.name, pictureURL, isFavorite: favoritePokemonsIdList.includes(id) };
        });

        setisFetching(false);
        return newPokemonList;
    }, []);

    const getPokemons = new Promise<SimplePokemon[]>(async (resolve: any, reject: any) => {
        const response = await pokemonApi.get<PokemonPaginatorResponse>(pokemonApiRef);

        if (
            response &&
            response.data &&
            response.data.results
        ) {
            resolve(mapPokemonList(response.data.results));
        } else {
            reject(new Error('getPokemons error'))
        }
    });

    return {
        isFetching,
        getPokemons,
    };
}
