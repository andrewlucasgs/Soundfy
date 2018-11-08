import React from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buscarContainer}>
          <TextInput
            placeholder='Buscar'
            style={styles.buscarField}
          />
        </View>
        <ScrollView >

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#141414',
  },
  buscarContainer: {
    alignItems: 'center',
  },
  buscarField: {
    color: '#fff',
    alignContent: 'center',
    backgroundColor: '#474747',
    padding: 10,
    width: 300
  }
});
