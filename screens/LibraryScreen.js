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

export default class LibraryScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View>
            <TouchableOpacity onPress={()=>{this.props.navigation.push('Musics')}} style={styles.listItems}>
              <View>
                <Icon.Ionicons
                  name={Platform.OS === 'ios' ? 'ios-musical-note' : 'md-musical-note'}
                  size={26}
                  color='#fff'
                />
              </View>
              <Text style={styles.items}>Músicas</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.listItems}>
              <Icon.Ionicons
                name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
                size={26}
                color='#fff'
              />
              <Text style={styles.items}>Artistas</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.listItems} onPress={()=>{this.props.navigation.navigate('AlbunsLibrary')}}>
              <Icon.Ionicons
                name={Platform.OS === 'ios' ? 'ios-disc' : 'md-disc'}
                size={26}
                color='#fff'
              />
              <Text style={styles.items}>Álbuns</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.listItems}>
              <Icon.Ionicons
                name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
                size={26}
                color='#fff'
              />
              <Text style={styles.items}>Playlists</Text>
            </TouchableOpacity>
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
