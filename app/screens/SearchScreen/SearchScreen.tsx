import React, { useEffect, useContext, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, FlatList, Text, ListRenderItemInfo } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AppContext } from '../../context/AppContext/AppContext';
import { themeContext } from '../../context/ThemeContext/ThemeContext';
import SearchInput from '../../components/SearchInput/SearchInput';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import { SimplePokemon } from '../../interfaces/pokemonInterfaces';
import { RootHomeStackParams } from '../../navigator/HomeStackNavigation';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';
import { styles } from './styles';
import { globalThemes } from '../../theme/globalThemes';

interface SearchScreenProps {
    navigation: StackNavigationProp<RootHomeStackParams, 'homeScreen'>
}


const SearchScreen = ({ navigation }: SearchScreenProps) => {

    const tabBarHeight = useBottomTabBarHeight();
    const { appState: { pokemonList } } = useContext(AppContext);
    const { themeState: { dark, colors } } = useContext(themeContext);
    const [pokemonFiltered, setpokemonFiltered] = useState<SimplePokemon[]>([]);
    const [onDebounceSearching, setonDebounceSearching] = useState<string>('')

    const filterPokemonBy = (inputValue: string) => {
        let filterList: SimplePokemon | SimplePokemon[] | undefined;

        if (isNaN(Number(inputValue))) {
            filterList = pokemonList.filter(
                pokemon => pokemon.name.toLowerCase().includes(inputValue)
            );
        } else {
            filterList = pokemonList.find(pokemon => pokemon.id === inputValue);
        }
        setpokemonFiltered(
            (filterList === undefined) ? []
                : Array.isArray(filterList) ? filterList
                    : [filterList]
        );
    }

    useEffect(() => {
        const inputValue = onDebounceSearching.toLowerCase().trim();
        if (inputValue.length === 0) {
            setpokemonFiltered([]);
        } else {
            filterPokemonBy(inputValue)
        };

    }, [onDebounceSearching, pokemonList])

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
        <View style={[styles.container]}>
            <FocusAwareStatusBar backgroundColor={dark ? colors.background : '#9D9D9D'} />
            <SearchInput
                onDebounce={setonDebounceSearching}
                additionalStyles={[globalThemes.mt20]}
            />

            {pokemonFiltered.length === 0 ? (
                <View style={{
                    ...styles.container,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontFamily: 'Minecraft',
                        fontSize: 20,
                        textAlign: 'center',
                        color: colors.text,
                        ...globalThemes.mt20
                    }}>Search a pokemon by Name or Id</Text>
                </View>
            ) : (
                <FlatList
                    data={pokemonFiltered}
                    keyExtractor={(item, index) => keyExtractor(item, index)}
                    renderItem={renderItem}
                    numColumns={2}
                    maxToRenderPerBatch={8}
                    windowSize={15}
                    showsVerticalScrollIndicator={false}

                    contentContainerStyle={[
                        globalThemes.ph16,  
                        {
                            paddingTop: 85, 
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

export default React.memo(SearchScreen);