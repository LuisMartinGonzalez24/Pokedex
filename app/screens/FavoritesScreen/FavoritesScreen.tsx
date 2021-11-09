import React, { useContext, useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, FlatList, ListRenderItemInfo, Text, View } from 'react-native'
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import { getFavoritesPokemon, seePokemonsIdList } from '../../helpers/favoritesFunctions';
import { SimplePokemon } from '../../interfaces/pokemonInterfaces';
import { styles } from './styles';
import { RootHomeStackParams } from '../../navigator/HomeStackNavigation';
import { themeContext } from '../../context/ThemeContext/ThemeContext';
import { globalThemes } from '../../theme/globalThemes';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import { AppContext } from '../../context/AppContext/AppContext';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

interface FavoritesScreenProps {
    navigation: StackNavigationProp<RootHomeStackParams, 'homeScreen'>
}

const FavoritesScreen = ({ navigation }: FavoritesScreenProps) => {

    const { themeState: { dark, colors } } = useContext(themeContext);
    const { appState: { pokemonList } } = useContext(AppContext);
    const [listFavoritesPokemons, setlistFavoritesPokemons] = useState<SimplePokemon[]>([]);

    useEffect(() => {
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

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar backgroundColor={dark ? colors.background : '#9D9D9D'} />

            <HeaderComponent
                title={'Favorites'}
                titleColor={colors.text}
                backgroundColor={colors.background}
                showToggle={false}
                additionalStyles={[globalThemes.ph20, globalThemes.pv12,]}
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

                    contentContainerStyle={[globalThemes.ph16, { paddingTop: 40 }]}
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