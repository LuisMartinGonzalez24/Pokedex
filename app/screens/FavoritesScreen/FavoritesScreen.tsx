import React, { useContext, useEffect, useState } from 'react'
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import { getFavoritesPokemon, deleteAllFavoritePokemons } from '../../helpers/favoritesFunctions';
import { SimplePokemon } from '../../interfaces/pokemonInterfaces';
import { styles } from './styles';
import { RootHomeStackParams } from '../../navigator/HomeStackNavigation';
import { themeContext } from '../../context/ThemeContext/ThemeContext';
import { globalThemes } from '../../theme/globalThemes';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import { AppContext } from '../../context/AppContext/AppContext';
import HeaderWithOptions from '../../components/HeaderComponent/HeaderWithOptions';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import ModalComponent from '../../components/ModalComponent/ModalComponent';

interface FavoritesScreenProps {
    navigation: StackNavigationProp<RootHomeStackParams, 'homeScreen'>
}

const FavoritesScreen = ({ navigation }: FavoritesScreenProps) => {

    const tabBarHeight = useBottomTabBarHeight();
    const { themeState: { dark, colors } } = useContext(themeContext);
    const { appState: { pokemonList, pokemonListFavorites, }, emptyFavoritePokemon } = useContext(AppContext);
    const [showModal, setshowModal] = useState<boolean>(false);
    const [listFavoritesPokemons, setlistFavoritesPokemons] = useState<SimplePokemon[]>([]);

    /* const setListPokemons = async () => {
        const pokemonsId = await getFavoritesPokemon();
        console.log('favorites', pokemonsId)

        const favoritePokemons: SimplePokemon[] = pokemonList.filter(
            pokemon => pokemonsId.includes(pokemon.id)
        );

        setlistFavoritesPokemons(favoritePokemons);
    } */

    useEffect(() => {
        // setListPokemons();
        getFavoritesPokemon().then(pokemonsId => {
            console.log('favorites', pokemonsId)
            const favoritePokemons: SimplePokemon[] = pokemonList.filter(
                pokemon => pokemonsId.includes(pokemon.id)
            );
            setlistFavoritesPokemons(favoritePokemons);
        });
    }, [pokemonList])

    const keyExtractor = React.useCallback((pokemon: SimplePokemon, index: number) => `${index}-${pokemon.name}-${pokemon.id}`, []);

    const renderItem = React.useMemo(() => ({ item }: ListRenderItemInfo<SimplePokemon>) => {
        return (
            <PokemonCard
                pokemon={item}
                navigation={navigation}
            />
        )
    }, []);

    const removeAllFavoritePokemons = async () => {

        const pokemonsId = await getFavoritesPokemon();
        console.log('removeAllFavoritePokemons: ', pokemonsId);
        
        if (pokemonsId.length === 0) {
            console.log('No tienes pokemones para borrar')
        } else {
            await deleteAllFavoritePokemons();
            emptyFavoritePokemon();
            toggleModal();
        }
    }

    const toggleModal = () => {
        setshowModal(value => !value);
    }

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar backgroundColor={dark ? colors.background : '#9D9D9D'} />

            <ModalComponent
                setVisible={showModal}
                cancelCallback={toggleModal}
                actionCallback={removeAllFavoritePokemons}
            />

            <HeaderWithOptions
                title={'Favorites'}
                titleColor={colors.text}
                backgroundColor={colors.background}
                additionalStyles={[globalThemes.ph20, globalThemes.pv12,]}
                callback={() => removeAllFavoritePokemons()}
            />

            {listFavoritesPokemons.length === 0 ? (
                <View style={{
                    ...styles.container,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={[styles.message, globalThemes.mt20, { color: colors.text, }]}>
                        You don't have favorite pokemons.
                    </Text>

                    <Text style={[styles.message, globalThemes.mt20, { color: colors.text, }]}>
                        Add some!
                    </Text>

                </View>
            ) : (
                <FlatList
                    data={listFavoritesPokemons}
                    keyExtractor={(item, index) => keyExtractor(item, index)}
                    renderItem={renderItem}
                    numColumns={2}
                    maxToRenderPerBatch={8}
                    windowSize={15}
                    showsVerticalScrollIndicator={false}

                    contentContainerStyle={[
                        globalThemes.ph16, globalThemes.pt6,
                        {
                            paddingBottom: tabBarHeight
                        }
                    ]}
                    columnWrapperStyle={[
                        {
                            justifyContent: 'space-between'
                        },
                        globalThemes.mb24,
                    ]}
                />
            )}
        </View>
    )
}

export default FavoritesScreen;