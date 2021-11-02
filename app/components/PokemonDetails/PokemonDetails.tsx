import React, { useContext } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { PokemonFullDetails } from '../../interfaces/pokemonInterfaces';
import PokemonSprites from '../PokemonSprites/PokemonSprites';
import { styles } from './styles';
import { globalThemes } from '../../theme/globalThemes';
import PokemonStats from '../PokemonStats/PokemonStats';
import { themeContext } from '../../context/ThemeContext';

interface PokemonDetailsProps {
    pokemon: PokemonFullDetails;
}

const { height: screenHeight } = Dimensions.get('window');

const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {

    const { themeState } = useContext(themeContext);
    
    const pokemonTypes: string[] = [];
    const pokemonBaseAbilities: string[] = [];
    const pokemonMoves: string[] = [];

    pokemon.types.forEach(({ type }) => pokemonTypes.push(type.name));
    pokemon.abilities.forEach(habilitie => pokemonBaseAbilities.push(habilitie.ability.name));
    pokemon.moves.forEach(({ move }) => pokemonMoves.push(move.name));

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                ...StyleSheet.absoluteFillObject,
            }}
        >

            <View style={{
                marginTop: screenHeight * 0.50
            }}>

                <Text style={[styles.title, globalThemes.mb10, {
                    color: themeState.colors.text
                }]}>Types</Text>

                <Text style={[styles.text, globalThemes.mb10, {
                    color: themeState.colors.text
                }]}>{pokemonTypes.join(', ')}</Text>

                <Text style={[styles.title, globalThemes.mb10, {
                    color: themeState.colors.text
                }]}>Weight</Text>

                <Text style={[styles.text, globalThemes.mb10, {
                    color: themeState.colors.text
                }]}>{pokemon.weight} Kg</Text>

                {/** Sprites */}
                <Text style={[styles.title, globalThemes.mb14, {
                    color: themeState.colors.text
                }]}>Sprites</Text>
                <PokemonSprites pokemonSprite={pokemon.sprites} stylesProps={globalThemes.mb14} />

                {/**Habilities */}
                <Text style={[styles.title, globalThemes.mb10, {
                    color: themeState.colors.text
                }]}>Base Abilities</Text>

                <Text style={[styles.text, globalThemes.mb10, {
                    color: themeState.colors.text
                }]}>{pokemonBaseAbilities.join(', ')}</Text>

                <Text style={[styles.title, globalThemes.mb10, {
                    color: themeState.colors.text
                }]}>Moves</Text>

                <Text style={[styles.text, globalThemes.mh10, globalThemes.mb10, {
                    color: themeState.colors.text
                }]}>{pokemonMoves.join(', ')}</Text>

                <Text style={[styles.title, globalThemes.mb10, {
                    color: themeState.colors.text
                }]}>Stats</Text>

                <PokemonStats
                    pokemonStats={pokemon.stats}
                    aditionalStyles={[globalThemes.pl10, globalThemes.mb4]}
                />
            </View>

        </ScrollView>
    )
}

export default React.memo(PokemonDetails);