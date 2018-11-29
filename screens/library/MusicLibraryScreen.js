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

import { getLovedTrack, unloveTrack, updateNowPlaying, scrobble } from '../../api/api'

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
    this.mounted = true
    this.getMusics();
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    if (this.mounted)
      this.props.navigation.addListener('willFocus', () => this.getMusics());
  }

  getMusics() {
    if (this.mounted)
      getLovedTrack().then(data => {
        this.setState({
          musics: data.lovedtracks.track
        })
      });
  }


  render() {
    const loved = <Icon.Ionicons
      name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
      size={30}
      style={{ marginBottom: -3, color: 'red' }}
    />;

    const unloved = <Icon.Ionicons
      name={Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'}
      size={30}
      style={{ marginBottom: -3, color: 'white' }}
    />;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {this.state.musics.map(music => {
            music.love = true
            return (
              <TouchableOpacity key={music.name} onPress={() => { updateNowPlaying(music.name, music.artist.name) }} style={styles.item}>
                <View>
                  <Text style={styles.musicName}>{music.name}</Text>
                  <Text style={styles.musicArtist}>{music.artist.name}</Text>
                </View>
                <TouchableOpacity onPress={() => { music.love = false; unloveTrack(music.name, music.artist.name).then(() => this.getMusics()) }} style={{ padding: 10 }}>
                  {music.love ? loved : unloved}
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
  musicName: {
    color: '#fff',
    fontSize: 20,
  },
  musicArtist: {
    color: '#fff',
    fontSize: 15,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
  contentContainer: {
    paddingTop: 30,
  },
});
