import React from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { PokemonFullDetails } from '../../interfaces/pokemonInterfaces';
import PokemonSprites from '../PokemonSprites/PokemonSprites';
import { styles } from './styles';
import { globalThemes } from '../../theme/globalThemes';

interface PokemonDetailsProps {
    pokemon: PokemonFullDetails;
}

const { height: screenHeight } = Dimensions.get('window');

const PokemonDetails = ({ pokemon }: PokemonDetailsProps) => {

    const pokemonTypes: string[] = [];
    const pokemonBaseAbilities: string[] = [];
    const pokemonMoves: string[] = [];

    pokemon.types.forEach(({ type }) => pokemonTypes.push(type.name));
    pokemon.abilities.forEach(habilitie => pokemonBaseAbilities.push(habilitie.ability.name));
    pokemon.moves.forEach(({move}) => pokemonMoves.push(move.name));    

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

                <Text style={[styles.title, globalThemes.mb10]}>Types</Text>
                <Text style={[styles.text, globalThemes.mb10]}>{pokemonTypes.join(', ')}</Text>

                <Text style={[styles.title, globalThemes.mb10]}>Weight</Text>
                <Text style={[styles.text, globalThemes.mb10]}>{pokemon.weight} Kg</Text>

                {/** Sprites */}
                <Text style={[styles.title, globalThemes.mb14]}>Sprites</Text>
                <PokemonSprites pokemonSprite={pokemon.sprites} stylesProps={globalThemes.mb14}/>

                {/**Habilities */}
                <Text style={[styles.title, globalThemes.mb10]}>Base Abilities</Text>
                <Text style={[styles.text, globalThemes.mb10]}>{pokemonBaseAbilities.join(', ')}</Text>

                <Text style={[styles.title, globalThemes.mb10]}>Moves</Text>
                <Text style={[styles.text, globalThemes.mh10, globalThemes.mb10]}>{pokemonMoves.join(', ')}</Text>

                <Text style={[styles.title, globalThemes.mb10]}>Stats</Text>
            </View>

        </ScrollView>
    )
}

export default React.memo(PokemonDetails);