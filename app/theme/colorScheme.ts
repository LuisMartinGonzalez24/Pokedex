import { Theme } from "@react-navigation/native";

export interface ThemeState extends Theme {
    currentTheme: 'light' | 'dark';    
}

const lightTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    colors: {
        primary: '#5856D6',
        background: 'white',
        card: 'white',
        text: 'black',
        border: 'grey',
        notification: 'teal',
    }
}

const darkTheme: ThemeState = {
    currentTheme: 'dark',
    dark: true,
    colors: {
        primary: '#5856D6',
        background: '#161717',
        card: '#161717',
        text: 'white',
        border: 'grey',
        notification: 'teal',
    }
}

export {lightTheme, darkTheme};