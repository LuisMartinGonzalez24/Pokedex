import React, { useContext, useState } from 'react'
import { Dimensions, Text, View, TouchableOpacity, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import FadeInImage from '../../components/FadeInImage/FadeInImage';
import { useGetPokemonDetail } from '../../hooks/useGetPokemonDetail';
import PokemonDetails from '../../components/PokemonDetails/PokemonDetails';
import { globalThemes } from '../../theme/globalThemes';
import LottieView from "lottie-react-native";
import { themeContext } from '../../context/ThemeContext/ThemeContext';
import { RootHomeStackParams } from '../../navigator/HomeStackNavigation';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import { deleteFavoritePokemon, getFavoritesPokemon, saveFavoritePokemon } from '../../helpers/favoritesFunctions';
import { AppContext } from '../../context/AppContext/AppContext';

interface PokemonDetailsScreenProps extends StackScreenProps<RootHomeStackParams, 'pokemonDetailsScreen'> { }

const { height: screenHeight } = Dimensions.get('window');

const PokemonDetailsScreen = ({ navigation, route }: PokemonDetailsScreenProps) => {

    const { top } = useSafeAreaInsets();    
    const { themeState } = useContext(themeContext);
    const { pokemon: { id, name, pictureURL, isFavorite }, backgroundColor } = route.params;
    const { isLoading, pokemonFullDetail } = useGetPokemonDetail(id);
    const [favorite, setfavorite] = useState<boolean>(isFavorite);
    const { addFavoritePokemon, removeFavoritePokemon } = useContext(AppContext);

    const savePokemon = async (id: string) => {
        setfavorite(value => !value);
        await saveFavoritePokemon(id);
        const listPokemonsId = await getFavoritesPokemon();
        addFavoritePokemon(listPokemonsId);
    }

    const deletePokemon = async (id: string) => {
        setfavorite(value => !value);
        await deleteFavoritePokemon(id);
        const listPokemonsId = await getFavoritesPokemon();
        removeFavoritePokemon(listPokemonsId);
    }

    return (
        <View style={{ ...styles.container, marginTop: top, marginBottom: 50 }}>
            <FocusAwareStatusBar backgroundColor={backgroundColor} />
            {/** HEADER */}
            <View style={{
                height: Math.ceil(screenHeight * 0.5),
                backgroundColor,
                borderBottomLeftRadius: screenHeight / 2,
                borderBottomRightRadius: screenHeight / 2,
                zIndex: 1
            }}>
                {/** BackButton and FavoriteButton */}
                <View style={[styles.buttonActionsContainer, globalThemes.mh10]}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.backButton}
                        onPress={() => navigation.pop()}
                    >
                        <Icon name={'arrow-left-bold-circle-outline'} size={50} color={'white'} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.backButton}
                        onPress={() => isFavorite ? deletePokemon(id) : savePokemon(id)}
                    >
                        <Icon
                            name={favorite ? 'heart' : 'heart-outline'}
                            size={50}
                            color={favorite ? '#e63946' : '#fff'}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.titleContainer}>
                    <Text
                        style={[
                            styles.textName, {
                                color: themeState.dark ? themeState.colors.text : 'white'
                            }
                        ]}>{name}</Text>
                    <Text style={[
                        styles.textId, globalThemes.mt16, {
                            color: themeState.dark ? themeState.colors.text : 'white'
                        }
                    ]}># {id}</Text>
                </View>

                <Image
                    source={require('../../assets/images/pokebola-blanca.png')}
                    style={styles.whitePokeball}
                />

                <FadeInImage
                    uri={pictureURL}
                    styleProps={styles.stylesPropsFadeInImage}
                    aditionalStyleImage={styles.pokemonImage}
                />
            </View>

            {/** Details and loading */}
            {isLoading ? (
                <View>
                    <LottieView
                        source={require('../../assets/lottiefiles/loading-pikachu.json')}
                        autoPlay
                        loop
                        style={{
                            width: 300,
                            height: 300,
                            alignSelf: 'center'
                        }}
                    />

                    <Text style={{
                        fontFamily: 'Minecraft',
                        fontSize: 18,
                        position: 'absolute',
                        bottom: 25,
                        alignSelf: 'center',
                        color: themeState.colors.text
                    }}>Loading...</Text>
                </View>
            ) : (
                <PokemonDetails pokemon={pokemonFullDetail} />
            )}
        </View>
    )
}

export default React.memo(PokemonDetailsScreen);