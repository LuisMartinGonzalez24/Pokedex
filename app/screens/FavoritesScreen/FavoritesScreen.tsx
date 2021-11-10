import React, { useContext, useEffect, useState } from 'react'
import { FlatList, ListRenderItemInfo, Text, View, ToastAndroid } from 'react-native'
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
    const [visibleToast, setvisibleToast] = useState<boolean>(false);
    const [showModal, setshowModal] = useState<boolean>(false);
    const [listFavoritesPokemons, setlistFavoritesPokemons] = useState<SimplePokemon[]>([]);

    const setListFavoritePokemons = async () => {
        const listPokemonsId = await getFavoritesPokemon();

        const favoritePokemons: SimplePokemon[] = pokemonList.filter(
            pokemon => listPokemonsId.includes(pokemon.id)
        );
        setlistFavoritesPokemons(favoritePokemons);
    }

    useEffect(() => setvisibleToast(false), [visibleToast]);

    useEffect(() => {
        setListFavoritePokemons();
    }, [pokemonListFavorites])

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
        setshowModal(false);
        await deleteAllFavoritePokemons();
        emptyFavoritePokemon();
    }

    const toggleModal = async () => {
        const pokemonsId = await getFavoritesPokemon();
        if (pokemonsId.length === 0) {
            setvisibleToast(true);
        } else {
            setshowModal(true);
        }
    }

    const Toast = ({ visible, message }: { visible: boolean, message: string }) => {
        if (visible) {
            ToastAndroid.showWithGravityAndOffset(
                message,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return null;
        }
        return null;
    };

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar backgroundColor={dark ? colors.background : '#9D9D9D'} />

            <ModalComponent
                setVisible={showModal}
                cancelCallback={() => setshowModal(false)}
                actionCallback={removeAllFavoritePokemons}
            />

            <Toast visible={visibleToast} message="You don't have pokemons!" />

            <HeaderWithOptions
                title={'Favorites'}
                titleColor={colors.text}
                backgroundColor={colors.background}
                additionalStyles={[globalThemes.ph20, globalThemes.pv12,]}
                callback={toggleModal}
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