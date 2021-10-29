import React from 'react'
import { Text, View, ViewStyle } from 'react-native';
import { Stat } from '../../interfaces/pokemonInterfaces';
import { globalThemes } from '../../theme/globalThemes';
import { styles } from './styles';

interface PokemonStatsProps {
    pokemonStats: Stat[];
    aditionalStyles?: ViewStyle | ViewStyle[];
}

const PokemonStats = ({ pokemonStats, aditionalStyles }: PokemonStatsProps) => {

    const statColor = React.useCallback((statName: string): string => {
        switch (statName.toLowerCase()) {
            case 'hp':
                return '#77D970';
            case 'attack':
                return '#C56824';
            case 'defense':
                return '#1597E5';
            case 'special-attack':
                return '#FA1E0E';
            case 'special-defense':
                return '#FEE440';
            case 'speed':
                return '#E26A2C';

            default:
                return '#A6A9B6';
        }
    }, []);

    return (
        <View style={[styles.container, aditionalStyles]}>
            {pokemonStats.map(({ stat, base_stat }) => (
                <View key={stat.name} style={[styles.statContainer, globalThemes.mb4]}>
                    <Text style={[styles.stat]}> {stat.name}: </Text>
                    <Text style={[styles.baseStat]}> {base_stat} </Text>
                    <View
                        style={[
                            globalThemes.ml10,                            
                            {
                                height: 20,
                                width: base_stat * 1.5,
                                backgroundColor: statColor(stat.name),
                                borderRadius: 5,                                
                            }
                        ]}
                    />
                </View>
            ))}
        </View>
    )
}

export default PokemonStats;