import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home, {HomeHeaderOption} from '../screens/home/home';
import NewCartScreen, {
  NewCartHeaderOption,
} from '../screens/newCartScreen/newCart';
import UpdateCartScreen, {
  EditCartHeaderOption,
} from '../screens/editCartScreen/editCartScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={HomeHeaderOption} />
      <Stack.Screen
        name="add-new-cart"
        component={NewCartScreen}
        options={NewCartHeaderOption}
      />
      <Stack.Screen
        name="update-item-screen"
        component={UpdateCartScreen}
        options={EditCartHeaderOption}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
