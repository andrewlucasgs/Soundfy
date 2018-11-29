import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import SearchScreen from '../screens/search/SearchScreen';

import NavigationScreen from '../screens/navigation/NavigationScreen';

import LibraryScreen from '../screens/library/LibraryScreen';
import MusicLibraryScreen from '../screens/library/MusicLibraryScreen';
import AlbumLibraryScreen from '../screens/library/AlbumLibraryScreen';
import ArtistLibraryScreen from '../screens/library/ArtistLibraryScreen';
import PlaylistLibraryScreen from '../screens/library/PlaylistLibraryScreen';

import PlayerScreen from '../screens/player/PlayerScreen'


const HomeStack = createStackNavigator({
  Home: LibraryScreen,
  MusicLibrary: MusicLibraryScreen,
  AlbunsLibrary: AlbumLibraryScreen,
  ArtistLibrary: ArtistLibraryScreen,
  PlaylistLibrary: PlaylistLibraryScreen,
});
HomeStack.initialRouteName = 'Home';
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

const NavigationStack = createStackNavigator({
  Navigation: NavigationScreen,
});

NavigationStack.navigationOptions = {
  tabBarLabel: 'Navegar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-compass' : 'md-compass'}
    />
  ),
};


const PlayerStack = createStackNavigator({
  Player: PlayerScreen,
});

PlayerStack.navigationOptions = {
  tabBarLabel: 'Tocando',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-play' : 'md-play'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SearchStack,
  NavigationStack,
  PlayerStack,
},
  { 
    animationEnabled: true,
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
