import React, { useContext } from 'react'
import { FlatList, ActivityIndicator, ListRenderItemInfo, SafeAreaView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import { styles } from './styles';
import { SimplePokemon } from '../../interfaces/pokemonInterfaces';
import { globalThemes } from '../../theme/globalThemes';
import LottieView from "lottie-react-native";
import { themeContext } from '../../context/ThemeContext/ThemeContext';
import StatusBarComponent from '../../components/StatusBar/StatusBarComponent';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import { RootHomeStackParams } from '../../navigator/HomeStackNavigation';
import { AppContext } from '../../context/AppContext/AppContext';

interface HomeScreenProps extends StackScreenProps<RootHomeStackParams, 'homeScreen'> { }

const HomeScreen = ({ navigation }: HomeScreenProps) => {

    const { themeState } = useContext(themeContext);
    const { isFetching, pokemonListState, addMorePokemons } = useContext(AppContext);


    const getPokemonsUseCallback = React.useCallback(() => {
        addMorePokemons();
    }, []);

    const listFooterComponent = React.useMemo(() => (
        <ActivityIndicator size={50} color={'red'} style={{ height: 160 }} />
    ), []);

    const keyExtractor = React.useCallback((pokemon: SimplePokemon, index: number) => `${index}-${pokemon.name}-${pokemon.id}`, [pokemonListState]);

    const renderItem = React.useMemo(() => ({ item }: ListRenderItemInfo<SimplePokemon>) => {
        return (
            <PokemonCard
                pokemon={item}
                navigation={navigation}
            />
        )
    }, [pokemonListState]);

    return (
        <SafeAreaView style={{
            ...styles.container,
        }}>

            <StatusBarComponent
                barColor={themeState.colors.background}
                whiteOrBlackPokeball={themeState.dark}
            />

            <HeaderComponent 
                title={'Pokedex'}
                titleColor={themeState.colors.text}
                valueToggle={themeState.dark}
                backgroundColor={themeState.colors.background}
                additionalStyles={[globalThemes.ph20, globalThemes.pv12]}
            />

            {isFetching ? (
                <LottieView
                    source={require('../../assets/lottiefiles/loading-pikachu.json')}
                    autoPlay
                    loop
                />
            ) : (
                <FlatList
                    data={pokemonListState}
                    keyExtractor={(item, index) => keyExtractor(item, index)}
                    renderItem={renderItem}
                    numColumns={2}
                    maxToRenderPerBatch={8}
                    windowSize={15}
                    showsVerticalScrollIndicator={false}

                    contentContainerStyle={[globalThemes.ph16]}
                    columnWrapperStyle={[
                        {
                            justifyContent: 'space-between'
                        },
                        globalThemes.mb24,
                    ]}

                    //infinite scroll
                    onEndReached={getPokemonsUseCallback}
                    onEndReachedThreshold={0.3}

                    //footer
                    ListFooterComponent={listFooterComponent}
                />
            )}
        </SafeAreaView>
    )
}

export default HomeScreen;