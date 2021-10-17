import React from 'react'
import ThemeContext from './context/ThemeContext';
import Navigations from './navigator/Navigations';

const App = () => {
  return (
    <ThemeContext>
      <Navigations/>
    </ThemeContext>
  )
}

export default App;