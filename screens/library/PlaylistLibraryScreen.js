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

import { getLovedTrack, unloveTrack } from '../../api/api'

export default class LibraryScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props)
    this.state = {
      musics: []
    };
  }
  componentWillMount() {
    this.getMusics();
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', ()=>this.getMusics());
  }

  getMusics() {
    getLovedTrack().then(data => {
      this.setState({
        musics: data.lovedtracks.track
      })
    });
  }


  render() {

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {this.state.musics.map(music => {
            return (
              <TouchableOpacity key={music.name} style={styles.music}>
                <Text style={styles.items}>{music.name}</Text>
                <TouchableOpacity onPress={() => { unloveTrack(music.name, music.artist.name).then(() => this.getMusics()) }} style={{ padding: 10, backgroundColor: 'gray' }}>
                  <Text style={{ fontSize: 30, color: 'green' }}>+</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )
          })}

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
    fontSize: 25,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  music: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingTop: 30,
  },
});
