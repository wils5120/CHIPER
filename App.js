import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Router from './src/router/router'

/* se llama al router para el llamado de las distintas vistas */
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Router></Router>
    </SafeAreaView>
  )
}

export default App;
