import { useEffect, useState } from "react"
import { PokemonFullDetails } from "../interfaces/pokemonInterfaces";
import { pokemonApi } from '../api/pokemonAPI';

export const usePokemon = (id: string) => {
    

    const [isLoading, setisLoading] = useState(true);
    const [pokemonFullDetail, setpokemonFullDetail] = useState<PokemonFullDetails>({} as PokemonFullDetails);

    const getPokemonFullDetails =  async () => {
        const response = await pokemonApi.get<PokemonFullDetails>(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setpokemonFullDetail(response.data);
        setisLoading(false);
    }

    useEffect(() => {
        getPokemonFullDetails();
    }, [])

    return {
        isLoading,
        pokemonFullDetail,
    }
}
