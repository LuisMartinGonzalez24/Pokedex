import React from 'react'
import { AppProvider } from './context/AppContext/AppContext';
import { ThemeProvider } from './context/ThemeContext/ThemeContext';
import Navigations from './navigator/Navigations';

const App = () => {
  return (
    <AppProvider>
      <ThemeProvider>
        <Navigations />
      </ThemeProvider>
    </AppProvider>
  )
}

export default App;