import React, { useContext } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { PokemonFullDetails } from '../../interfaces/pokemonInterfaces';
import PokemonSprites from '../PokemonSprites/PokemonSprites';
import { styles } from './styles';
import { globalThemes } from '../../theme/globalThemes';
import PokemonStats from '../PokemonStats/PokemonStats';
import { themeContext } from '../../context/ThemeContext/ThemeContext';
import FadeInImage from '../FadeInImage/FadeInImage';

interface PokemonDetailsProps {
    pokemon: PokemonFullDetails;
}

const { height: screenHeight } = Dimensions.get('window');

const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {

    const { themeState: { dark, colors } } = useContext(themeContext);

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
                    color: colors.text
                }]}>Types</Text>

                <Text style={[styles.text, globalThemes.mb10, {
                    color: colors.text
                }]}>{pokemonTypes.join(', ')}</Text>

                <Text style={[styles.title, globalThemes.mb10, {
                    color: colors.text
                }]}>Weight</Text>

                <Text style={[styles.text, globalThemes.mb10, {
                    color: colors.text
                }]}>{pokemon.weight} Kg</Text>

                {/** Sprites */}
                <Text style={[styles.title, globalThemes.mb14, {
                    color: colors.text
                }]}>Sprites</Text>
                <PokemonSprites pokemonSprite={pokemon.sprites} stylesProps={globalThemes.mb14} />

                {/**Habilities */}
                <Text style={[styles.title, globalThemes.mb10, {
                    color: colors.text
                }]}>Base Abilities</Text>

                <Text style={[styles.text, globalThemes.mb10, {
                    color: colors.text
                }]}>{pokemonBaseAbilities.join(', ')}</Text>

                <Text style={[styles.title, globalThemes.mb10, {
                    color: colors.text
                }]}>Moves</Text>

                <Text style={[styles.text, globalThemes.mh10, globalThemes.mb10, {
                    color: colors.text
                }]}>{pokemonMoves.join(', ')}</Text>

                <Text style={[styles.title, globalThemes.mb10, {
                    color: colors.text
                }]}>Stats</Text>

                <PokemonStats
                    pokemonStats={pokemon.stats}
                    aditionalStyles={[globalThemes.ph10, globalThemes.mb20]}
                />

                <View style={styles.spriteContainer}>
                    <FadeInImage
                        uri={pokemon.sprites.front_default}
                        styleProps={[{
                            marginVertical: 20,
                            height: 100,
                            borderRadius: 50,
                            paddingHorizontal: 100,
                            backgroundColor: 'white',
                            shadowColor: dark ? '#ffffff' : 'rgba(0,0,0,1)',
                            shadowOffset: {
                                width: 10,
                                height: 5,
                            },
                            shadowOpacity: 0.30,
                            shadowRadius: 6.38,

                            elevation: 7,
                        }]}
                    />
                </View>
            </View>

        </ScrollView>
    )
}

export default React.memo(PokemonDetails);