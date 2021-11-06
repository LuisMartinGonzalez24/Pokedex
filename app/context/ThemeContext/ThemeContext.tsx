import React, { createContext, useReducer } from 'react'
import { themeReducer } from './themeReducer';
import { ThemeState, lightTheme, darkTheme } from '../../theme/colorScheme';

//* Definition and what must export my context
interface ThemeContextProps {
    themeState: ThemeState;
    setLightTheme: () => void;
    setDarkTheme: () => void;
}

//* Create context
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