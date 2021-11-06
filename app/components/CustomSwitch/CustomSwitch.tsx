import React, { useContext, useState } from 'react'
import { Switch } from 'react-native';
import { themeContext } from '../../context/ThemeContext/ThemeContext';

interface CustomSwitchProps {
    isOn: boolean;
}

const CustomSwitch = ({ isOn }: CustomSwitchProps) => {

    const { setLightTheme, setDarkTheme } = useContext(themeContext);
    const [isDarkMode, setisDarkMode] = useState(isOn);
    
    const toggleSwitch = React.useCallback(() => {
        setisDarkMode(value => !value);

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