import React, { useEffect, useRef, useState } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import ImageColors from 'react-native-image-colors'
import { styles } from './styles';
import { SimplePokemon } from '../../interfaces/pokemonInterfaces';
import FadeInImage from '../FadeInImage/FadeInImage';
import { RootStackParams } from '../../navigator/Navigations';
import { StackNavigationProp } from '@react-navigation/stack';

interface PokemonCardProps {
    pokemon: SimplePokemon;
    navigation: StackNavigationProp<RootStackParams, 'homeScreen'>
}

const { width: screenWidth } = Dimensions.get('window');

const PokemonCard = ({ pokemon, navigation }: PokemonCardProps) => {


    const [pokemonBackgroundColor, setpokemonBackgroundColor] = useState<string>('grey');
    const isMounted = useRef(true);

    const getColorsOfImage = async (urlImage: string) => {

        try {
            const result = await ImageColors.getColors(urlImage, {
                fallback: 'grey',
            })

            switch (result.platform) {
                case 'android':
                    // android result properties                
                    return result.dominant
                case 'ios':
                    // iOS result properties                
                    return result.background
                default:
                    return 'grey'
            }
        } catch (error) {
            console.log('>>ERROR getColorsOfImage: ', error);
        }
    }

    useEffect(() => {
        getColorsOfImage(pokemon.pictureURL).then((color) => {
            if (isMounted.current) {
                setpokemonBackgroundColor(color || 'grey')
            }
        })

        return () => {
            isMounted.current = false;
        }
    }, [])


    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('pokemonDetailsScreen', {
                pokemon,
                backgroundColor: pokemonBackgroundColor
            })}
            style={{
                ...styles.container,
                width: screenWidth * 0.44,
                backgroundColor: pokemonBackgroundColor
            }}
        >

            <View style={styles.textsContainer}>
                <Text style={styles.textName}>{pokemon.name}</Text>
                <Text style={styles.textId}># {pokemon.id}</Text>
            </View>


            <View style={styles.containerWhitePokeball}>
                <Image
                    source={require('../../assets/pokebola-blanca.png')}
                    style={styles.imageWhitePokeball}
                />
            </View>

            <FadeInImage uri={pokemon.pictureURL} styleProps={{
                position: 'absolute',
                bottom: -10,
                right: -5,
            }} />


        </TouchableOpacity>
    )
}

export default React.memo(PokemonCard);