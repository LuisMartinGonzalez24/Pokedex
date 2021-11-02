import React, { useContext, useEffect, useState } from 'react'
import { Image, Text, View, FlatList, ActivityIndicator, VirtualizedList, ListRenderItemInfo, SafeAreaView, StatusBar, Switch } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import { usePokemonPaginator } from '../../hooks/usePokemonPaginator';
import { styles } from './styles';
import { RootStackParams } from '../../navigator/Navigations';
import { SimplePokemon } from '../../interfaces/pokemonInterfaces';
import { globalThemes } from '../../theme/globalThemes';
import LottieView from "lottie-react-native";
import { themeContext } from '../../context/ThemeContext';
import CustomSwitch from '../../components/CustomSwitch/CustomSwitch';
import StatusBarComponent from '../../components/StatusBar/StatusBarComponent';

interface HomeScreenProps extends StackScreenProps<RootStackParams, 'homeScreen'> { }

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

    const headerComponent = (valueToggle: boolean) => {
        console.log('Header render');
        return (
            <View>
                <Text style={{
                    ...styles.title,
                    marginVertical: 20,
                    color: themeState.colors.text
                }}>Pokedex</Text>
                <CustomSwitch isOn={valueToggle} />
            </View>
        )
    };

    const listHeaderComponent = React.useMemo(() => headerComponent(themeState.dark), [themeState]);

    const listFooterComponent = React.useMemo(() => (
        <ActivityIndicator size={50} color={'red'} style={{ height: 100 }} />
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

    const itemHeight = React.useRef(135).current;
    const getItemLayout = React.useCallback((data: SimplePokemon[] | null | undefined, index: number) => ({
        length: itemHeight,
        offset: itemHeight * index,
        index
    }), [])


    //* VirtualizedList
    const getItemCount = (data: SimplePokemon[]): number => data.length;
    const getItem = (pokemon: SimplePokemon[], index: number): SimplePokemon => pokemon[index];

    return (
        <SafeAreaView style={{
            ...styles.container,
        }}>

            <StatusBarComponent barColor={themeState.colors.background} whiteOrBlackPokeball={themeState.dark}/>

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

                    //header
                    ListHeaderComponent={listHeaderComponent}

                    //footer
                    ListFooterComponent={listFooterComponent}
                />
            )}

            {/* <VirtualizedList
                data={pokemonList}
                keyExtractor={keyExtractor}
                extraData={pokemonList}
                getItemCount={getItemCount}
                getItem={(item, index) => getItem(item, index)}
                showsVerticalScrollIndicator={false}

                renderItem={renderItem}

                getItemLayout={(data, index) => (
                    { length: 135, offset: 135 * index, index }
                )}

                //header
                ListHeaderComponent={listHeaderComponent}

                //footer
                ListFooterComponent={listFooterComponent}

                //infinite scroll
                onEndReached={getPokemons2}
                onEndReachedThreshold={0.3}
            /> */}


        </SafeAreaView>
    )
}

export default HomeScreen;