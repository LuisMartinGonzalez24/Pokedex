import React, { createContext, useReducer } from 'react'
import { themeReducer } from './themeReducer';
import { ThemeState, lightTheme, darkTheme } from '../../theme/colorScheme';

//* Information that i want to expose
interface ThemeContextProps {
    themeState: ThemeState;
    setLightTheme: () => void;
    setDarkTheme: () => void;
}

const themeContext = createContext({} as ThemeContextProps);

const ThemeProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [themeState, dispatch] = useReducer(themeReducer, lightTheme);

    const setLightTheme = () => {
        dispatch({
            type: 'set_light_theme',
            payload: lightTheme
        })
    }

    const setDarkTheme = () => {
        dispatch({
            type: 'set_dark_theme',
            payload: darkTheme
        })
    }

    return (
        <themeContext.Provider value={{
            themeState,
            setLightTheme,
            setDarkTheme,
        }}>
            {children}
        </themeContext.Provider>
    )
}

export {ThemeProvider, themeContext};