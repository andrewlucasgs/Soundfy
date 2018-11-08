import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
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

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
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
  LinksStack,
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

      },
    }
  }
);
