import React, { useContext } from 'react';
import { Image, StatusBar } from 'react-native';
import { themeContext } from '../../context/ThemeContext';
import { styles } from './styles';

interface StatusBarComponentProps {
    barColor: string;
    whiteOrBlackPokeball: boolean;
}

const StatusBarComponent = ({ barColor, whiteOrBlackPokeball }: StatusBarComponentProps) => {
    console.log('whiteOrBlackPokeball: ', whiteOrBlackPokeball)
    const { themeState: { dark, colors } } = useContext(themeContext);
    // console.log('StatusBarComponent:', themeState)
    return (
        <>
            <StatusBar backgroundColor={dark ? colors.background : '#9D9D9D'} />
            {dark ? (
                <Image
                    source={require('../../assets/images/pokebola-blanca.png')}
                    style={styles.pokeballWhiteBG}
                />
            ) : (
                <Image
                    source={require('../../assets/images/pokebola.png')}
                    style={styles.pokeballBG}
                />
            )}
        </>
    )
}

export default React.memo(StatusBarComponent);