import React, { useEffect } from 'react'
import { Image, Text, View, FlatList, ActivityIndicator, VirtualizedList, ListRenderItemInfo } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import { usePokemonPaginator } from '../../hooks/usePokemonPaginator';
import { styles } from './styles';
import { RootStackParams } from '../../navigator/Navigations';
import { SimplePokemon } from '../../interfaces/pokemonInterfaces';

interface HomeScreenProps extends StackScreenProps<RootStackParams, 'homeScreen'> { }

const HomeScreen = ({ navigation }: HomeScreenProps) => {

    console.log('me he vuelto a en homeScreen renderizar :(');

    const { top } = useSafeAreaInsets();
    const { pokemonList, getPokemons2 } = usePokemonPaginator();

    const getPokemonsUseCallback = React.useCallback(() => {
        getPokemons2();
    }, []);

    const listHeaderComponent = React.useMemo(() => (
        <Text style={{
            ...styles.title,
            marginVertical: top + 20,
            marginLeft: 10
        }}>Pokedex</Text>
    ), []);

    const listFooterComponent = React.useMemo(() => (
        <ActivityIndicator size={50} color={'red'} style={{ height: 100 }} />
    ), []);

    const keyExtractor = React.useCallback((pokemon: SimplePokemon) => pokemon.id, []);
    const renderItem = React.useCallback(({ item }: ListRenderItemInfo<SimplePokemon>) => {
        return (
            <PokemonCard
                pokemon={item}
                navigation={navigation}
            />
        )
    }, []);


    //* VirtualizedList
    const getItemCount = (data: SimplePokemon[]) => data.length;
    const getItem = (pokemon: SimplePokemon[], index: number) => pokemon[index];

    return (
        <View style={{
            ...styles.container,
            height: top,
        }}>
            <Image
                source={require('../../assets/pokebola.png')}
                style={styles.pokeballBG}
            />

            {/* <FlatList
                data={pokemonList}                
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}     
                //TODO: Probar luego      
                // extraData={pokemonList}

                //infinite scroll
                onEndReached={getPokemonsUseCallback}
                onEndReachedThreshold={0.3}

                //header
                ListHeaderComponent={listHeaderComponent}

                //footer
                ListFooterComponent={listFooterComponent}
            /> */}

            <VirtualizedList
                data={pokemonList}
                keyExtractor={keyExtractor}
                getItem={(item, index) => getItem(item, index)}
                extraData={pokemonList}
                getItemCount={getItemCount}
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
            />


        </View>
    )
}

export default HomeScreen;