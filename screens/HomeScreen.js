import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.listItems}>
            <View>
              <Icon.Ionicons
                name={Platform.OS === 'ios' ? 'ios-musical-note' : 'md-musical-note'}
                size={26}
                color='#fff'
              />
            </View>
            <Text style={styles.items}>Músicas</Text>
          </View>
          <View style={styles.listItems}>
            <Icon.Ionicons
              name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
              size={26}
              color='#fff'
            />
            <Text style={styles.items}>Artistas</Text>
          </View>
          <View style={styles.listItems}>
            <Icon.Ionicons
              name={Platform.OS === 'ios' ? 'ios-disc' : 'md-disc'}
              size={26}
              color='#fff'
            />
            <Text style={styles.items}>Álbuns</Text>
          </View>
          <View style={styles.listItems}>
            <Icon.Ionicons
              name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
              size={26}
              color='#fff'
            />
            <Text style={styles.items}>Playlists</Text>
          </View>
          <View style={styles.welcomeContainer}>
            <Text style={styles.items}>Recentes</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  items: {
    color: '#fff',
    alignSelf: 'center',
    paddingLeft: 20,
  },
  listItems: {
    flexDirection: 'row',
    padding: 10,
  },
  contentContainer: {
    paddingTop: 30,
  },
});
