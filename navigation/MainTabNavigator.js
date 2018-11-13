import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LibraryScreen from '../screens/LibraryScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MusicsScreen from '../screens/MusicsScreen';
import AlbunsLibraryScreen from '../screens/AlbunsLibraryScreen';




const HomeStack = createStackNavigator({
  Home: LibraryScreen,
  Musics: MusicsScreen,
  AlbunsLibrary: AlbunsLibraryScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Biblioteca',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-musical-notes${focused ? '' : '-outline'}`
          : 'md-musical-notes'
      }
    />
  ),
};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Buscar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Navegar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-compass' : 'md-compass'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SearchStack,
  SettingsStack,
},
  {
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#fff',
      activeBackgroundColor: 'rgba(0, 0, 0, 0.5)',
      inactiveBackgroundColor: '#474747',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#474747'
      },
    }
  }
);
