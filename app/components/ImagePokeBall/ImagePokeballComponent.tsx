import React, { useContext } from 'react';
import { Image } from 'react-native';
import { themeContext } from '../../context/ThemeContext/ThemeContext';
import { styles } from './styles';

const ImagePokeballComponent = () => {
    const { themeState: { dark } } = useContext(themeContext);
    return dark ? (
        <Image
            source={require('../../assets/images/pokebola-blanca.png')}
            style={styles.pokeballWhiteBG}
        />
    ) : (
        <Image
            source={require('../../assets/images/pokebola.png')}
            style={styles.pokeballBG}
        />
    )
}

export default React.memo(ImagePokeballComponent);