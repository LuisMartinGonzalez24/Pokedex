import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native';
import { styles } from './styles';
import { Sprites } from '../../interfaces/pokemonInterfaces';
import FadeInImage from '../FadeInImage/FadeInImage';
import { globalThemes } from '../../theme/globalThemes';

interface PokemonSpritesProps {
    pokemonSprite: Sprites;
    stylesProps?: StyleSheet.NamedStyles<{}>;
}

const PokemonSprites = ({ pokemonSprite, stylesProps }: PokemonSpritesProps) => {

    const sprites: string[] = [
        pokemonSprite.back_default,
        pokemonSprite.front_default,
        pokemonSprite.back_shiny,
        pokemonSprite.front_shiny,
    ];

    return (
        <View style={[styles.container, stylesProps]}>
            <FlatList
                horizontal
                data={sprites}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <FadeInImage
                        uri={item}
                        styleProps={[globalThemes.mh10]}                        
                    />
                )}
            />
        </View>
    )
}

export default PokemonSprites;