import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api/pokemonAPI";
import { PokemonPaginatorResponse, SimplePokemon, Result } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginator = () => {

    //const isMounted = useRef(true);
    const [isLoading, setisLoading] = useState(true);
    const [pokemonList, setpokemonList] = useState<SimplePokemon[]>([]);
    const nextPageURL = useRef<string>('https://pokeapi.co/api/v2/pokemon?limit=20');

    const getIdFromURL = (url: string): string => {
        const URLParts = url.split('/');
        const id = URLParts[URLParts.length - 2];
        return id;
    }

    const getPictureURL = (id: string): string => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    const mapPokemonList = (pokemonListResult: Result[]) => {
        const newPokemonList: SimplePokemon[] = pokemonListResult.map(pokemon => {
            const id = getIdFromURL(pokemon.url);
            let pictureURL = getPictureURL(id);

            return { id, name: pokemon.name, pictureURL }
        });

        setpokemonList(pokemons => [...pokemons, ...newPokemonList]);
        setisLoading(false);
    };

    const getPokemons2 = () => {
        new Promise((resolve: any, reject: any) => {
            setisLoading(true);
            const response = pokemonApi.get<PokemonPaginatorResponse>(nextPageURL.current);
    
            response.then(resp => {
                // console.log(resp.data);
                nextPageURL.current = resp.data.next;
                mapPokemonList(resp.data.results);
                resolve();
            }).catch(ex => {
                console.log(ex);
                reject();
            });
    
        })
    }

    const getPokemons = async () => {
        setisLoading(true);
        try {
            console.log('Comienza de carga de pokemons', nextPageURL.current);
            const response = await pokemonApi.get<PokemonPaginatorResponse>(nextPageURL.current);
            nextPageURL.current = response.data.next;
            mapPokemonList(response.data.results);
            console.log('Fin de carga de pokemons');
        } catch (error) {
            console.log('getPokemons error: ', error)
        }
    };

    useEffect(() => {
        getPokemons2();
    }, []);

    return {
        isLoading,
        pokemonList,
        getPokemons2
    }
}
