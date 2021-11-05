import { useState, useEffect } from "react";
import { pokemonApi } from "../api/pokemonAPI";
import { PokemonPaginatorResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';

export const getAllPokemons = () => {    

    const [isFetching, setisFetching] = useState(true);
    const [pokemonList, setpokemonList] = useState<SimplePokemon[]>([]);

    useEffect(() => {
        getPokemons();
    }, []);

    const getIdFromURL = (url: string): string => {
        const URLParts = url.split('/');
        const id = URLParts[URLParts.length - 2];
        return id;
    };

    const getPictureURL = (id: string): string => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    const mapPokemonList = (pokemonListResult: Result[]) => {
        const newPokemonList: SimplePokemon[] = pokemonListResult.map(pokemon => {
            const id = getIdFromURL(pokemon.url);
            const pictureURL = getPictureURL(id);

            return { id, name: pokemon.name, pictureURL }
        });

        setpokemonList(newPokemonList);
        setisFetching(false);
    }

    const getPokemons = async () => {
        try {
            const response = await pokemonApi.get<PokemonPaginatorResponse>('https://pokeapi.co/api/v2/pokemon?limit=1180');

            mapPokemonList(response.data.results);
        } catch (ex) {
            throw new Error('>>Error getPokemons: ' + ex);
        }
    };

    return {
        isFetching, pokemonList, getPokemons
    };
}
