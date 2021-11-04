import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { themeContext } from '../context/ThemeContext';
import { BottomTabNavigation } from './BottomTabNavigation';

const Navigations = () => {

    const { themeState } = useContext(themeContext);

    return (
        <NavigationContainer theme={themeState}>
            <BottomTabNavigation />
        </NavigationContainer>
    )
}

export default Navigations;