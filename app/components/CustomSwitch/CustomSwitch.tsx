import React, { useContext, useState } from 'react'
import { Switch, View } from 'react-native';
import { themeContext } from '../../context/ThemeContext';

interface CustomSwitchProps {
    isOn: boolean;
}

const CustomSwitch = ({ isOn }: CustomSwitchProps) => {

    const { setLightTheme, setDarkTheme } = useContext(themeContext);
    const [isDarkMode, setisDarkMode] = useState(isOn);
    
    const toggleSwitch = React.useCallback(() => {
        setisDarkMode(value => !value);

        console.log('New value toggle: ', isDarkMode)

        if(isDarkMode) {
            setLightTheme();
        } else {
            setDarkTheme();
        }
    }, [isDarkMode]);
    
    return (
        <Switch
            trackColor={{ false: "#767577", true: "#1dd1a1" }}
            thumbColor={"#ffffff"}
            onValueChange={toggleSwitch}
            value={isDarkMode}
        />
    )
}

export default CustomSwitch;