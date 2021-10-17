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
    const { pokemonList, getPokemons } = usePokemonPaginator();

    /* const getItem = (data: SimplePokemon[], index: number) => data[index];
    const getItemCount = (data: SimplePokemon[]): number => data.length;

    const getItemLayout = (data: SimplePokemon[], index: number) => {
        let offset = 0;
        for (let x = 0; x < data.length && x < index; x++) {
            offset = offset + 135;
        }
        return {
            length: 135,
            offset: offset,
            index,
        };
    } */

    //const getPokemonsCallBack = React.useCallback(getPokemons, [pokemonList]);

    const getPokemonsUseCallback = React.useCallback(() => {
        getPokemons();
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

    return (
        <View style={{
            ...styles.container,
            height: top,
        }}>
            <Image
                source={require('../../assets/pokebola.png')}
                style={styles.pokeballBG}
            />

            <FlatList
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
            />

            {/* <VirtualizedList
                data={pokemonList}
                initialNumToRender={20}
                keyExtractor={(pokemon) => pokemon.id}
                getItem={getItem}
                getItemCount={getItemCount}
                showsVerticalScrollIndicator={false}

                renderItem={({ item }) => (

                    <PokemonCard
                        pokemon={item}
                        navigation={navigation}
                        key={item.id}
                    />
                )}


                //Header
                ListHeaderComponent={() => (
                    <Text style={{
                        ...styles.title,
                        marginTop: top + 20,
                        marginBottom: top + 20,
                        marginLeft: 10
                    }}>Pokedex</Text>
                )}

                // Footer
                ListFooterComponent={<ActivityIndicator size={50} color={'red'} style={{ height: 100 }} />}

                //infinite scroll
                onEndReached={getPokemons}
                onEndReachedThreshold={0.4}
            /> */}


        </View>
    )
}

export default HomeScreen;