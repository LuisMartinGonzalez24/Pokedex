import React, { useContext } from 'react'
import { FlatList, ActivityIndicator, ListRenderItemInfo, SafeAreaView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import { styles } from './styles';
import { SimplePokemon } from '../../interfaces/pokemonInterfaces';
import { globalThemes } from '../../theme/globalThemes';
import LottieView from "lottie-react-native";
import { themeContext } from '../../context/ThemeContext/ThemeContext';
import ImagePokeballComponent from '../../components/ImagePokeBall/ImagePokeballComponent';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import { RootHomeStackParams } from '../../navigator/HomeStackNavigation';
import { AppContext } from '../../context/AppContext/AppContext';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar/FocusAwareStatusBar';

interface HomeScreenProps extends StackScreenProps<RootHomeStackParams, 'homeScreen'> { }

const HomeScreen = ({ navigation }: HomeScreenProps) => {

    const { themeState: { dark, colors } } = useContext(themeContext);
    const { isFetching, appState: { pokemonList } } = useContext(AppContext);

    const listFooterComponent = React.useMemo(() => (
        <ActivityIndicator size={50} color={'red'} style={{ height: 160 }} />
    ), []);

    const keyExtractor = React.useMemo(() => (pokemon: SimplePokemon, index: number) => `${index}-${pokemon.id}`, []);

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

            <FocusAwareStatusBar backgroundColor={dark ? colors.background : '#9D9D9D'} />

            <ImagePokeballComponent />

            <HeaderComponent
                title={'Pokedex'}
                titleColor={colors.text}
                showToggle={true}
                valueToggle={dark}
                backgroundColor={colors.background}
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
                    data={pokemonList}
                    keyExtractor={(item, index) => keyExtractor(item, index)}
                    renderItem={renderItem}
                    numColumns={2}
                    maxToRenderPerBatch={8}
                    windowSize={15}
                    showsVerticalScrollIndicator={false}

                    style={[globalThemes.pt10]}
                    contentContainerStyle={[globalThemes.ph16]}
                    columnWrapperStyle={[
                        {
                            justifyContent: 'space-between'
                        },
                        globalThemes.mb24,
                    ]}

                    //footer
                    ListFooterComponent={listFooterComponent}
                />
            )}
        </SafeAreaView>
    )
}

export default React.memo(HomeScreen);