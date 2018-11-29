import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import TutorialScreen from '../screens/TutorialScreen';

export default TutorialStack = createStackNavigator({
  Tutorial: TutorialScreen,
});
TutorialStack.initialRouteName = 'Tutorial';
