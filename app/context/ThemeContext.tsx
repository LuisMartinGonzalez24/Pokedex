import React, { createContext, useReducer } from 'react'
import { themeReducer } from './themeReducer';
import { ThemeState, lightTheme, darkTheme } from '../theme/colorScheme';

//* Information that i want to expose
interface ThemeContextProps {
    themeState: ThemeState;
    setLightTheme: () => void;
    setDarkTheme: () => void;
}

export const themeContext = createContext({} as ThemeContextProps);

const ThemeContext = ({ children }: { children: JSX.Element | JSX.Element[] }) => {

    const [themeState, dispatch] = useReducer(themeReducer, lightTheme)
    console.log('me he vuelto a renderizar themeScreen :(')

    const setLightTheme = () => {
        dispatch({
            type: 'set_light_theme',
            payload: lightTheme
        })
    }

    const setDarkTheme = () => {
        dispatch({
            type: 'set_light_theme',
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

export default ThemeContext;