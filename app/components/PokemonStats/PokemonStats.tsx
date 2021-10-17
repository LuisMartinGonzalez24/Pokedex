import React from 'react'
import { View } from 'react-native';
import { Stat } from '../../interfaces/pokemonInterfaces';

interface PokemonStatsProps {
    pokemonStats: Stat;
}

const PokemonStats = ({pokemonStats}: PokemonStatsProps) => {
    
    const { stat } = pokemonStats;
    
    return (
        <View>
            
        </View>
    )
}

export default PokemonStats;