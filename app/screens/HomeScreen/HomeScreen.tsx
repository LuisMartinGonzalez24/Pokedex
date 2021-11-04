import React, { useContext, useEffect, useState } from 'react'
import { FlatList, ActivityIndicator, ListRenderItemInfo, SafeAreaView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import { usePokemonPaginator } from '../../hooks/usePokemonPaginator';
import { styles } from './styles';
import { SimplePokemon } from '../../interfaces/pokemonInterfaces';
import { globalThemes } from '../../theme/globalThemes';
import LottieView from "lottie-react-native";
import { themeContext } from '../../context/ThemeContext';
import StatusBarComponent from '../../components/StatusBar/StatusBarComponent';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import { RootHomeStackParams } from '../../navigator/HomeStackNavigation';

interface HomeScreenProps extends StackScreenProps<RootHomeStackParams, 'homeScreen'> { }

const HomeScreen = ({ navigation }: HomeScreenProps) => {

    //const [myPokemonList, setmyPokemonList] = useState<any>([]);
    // console.log('me he vuelto a en homeScreen renderizar :(');
    const { themeState } = useContext(themeContext);
    const [isLoading, setisLoading] = useState(true);

    const { pokemonList, getPokemons } = usePokemonPaginator();

    useEffect(() => {
        setTimeout(() => {
            setisLoading(false);
        }, 3000);
    }, [])

    const getPokemonsUseCallback = React.useCallback(() => {
        getPokemons();
    }, []);

    console.log('is dark: ', themeState.dark);

    const listFooterComponent = React.useMemo(() => (
        <ActivityIndicator size={50} color={'red'} style={{ height: 160 }} />
    ), []);

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

            {isLoading ? (
                <LottieView
                    source={require('../../assets/lottiefiles/loading-pikachu.json')}
                    autoPlay
                    loop
                />
            ) : (
                <FlatList
                    data={pokemonList}
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