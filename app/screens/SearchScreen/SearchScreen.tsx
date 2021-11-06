import React, { useEffect, useContext, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, ActivityIndicator, FlatList, Text, ListRenderItemInfo } from 'react-native';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import SearchInput from '../../components/SearchInput/SearchInput';
import { themeContext } from '../../context/ThemeContext/ThemeContext';
import { SimplePokemon } from '../../interfaces/pokemonInterfaces';
import { globalThemes } from '../../theme/globalThemes';
import { styles } from './styles';
import { RootHomeStackParams } from '../../navigator/HomeStackNavigation';
import { AppContext } from '../../context/AppContext/AppContext';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';

interface SearchScreenProps {
    navigation: StackNavigationProp<RootHomeStackParams, 'homeScreen'>
}

const SearchScreen = ({ navigation }: SearchScreenProps) => {

    const { isFetching, pokemonList } = useContext(AppContext);
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

    }, [onDebounceSearching])

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

            {isFetching ? (
                (
                    <View style={{
                        ...styles.container,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ActivityIndicator
                            size={45}
                            color={colors.text}
                        />
                        <Text style={{
                            fontFamily: 'Minecraft',
                            fontSize: 12,
                            textAlign: 'center',
                            ...globalThemes.mt20
                        }}>Fetching pokemons...</Text>
                    </View>
                )
            ) : pokemonFiltered.length === 0 ? (
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

                    contentContainerStyle={[globalThemes.ph16, { paddingTop: 85 }]}
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