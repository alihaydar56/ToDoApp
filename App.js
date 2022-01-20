import React from 'react';
import StackNavigation from './src/navigator/navigator';
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation></StackNavigation>
    </NavigationContainer>
  );
};
export default App;
