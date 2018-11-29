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

import { getRecentTracks, unloveTrack, loveTrack, updateNowPlaying } from '../../api/api'




export default class LibraryScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props)
    this.getRecentMusics = this.getRecentMusics.bind(this)
    this.state = {
      recentsMusics: [],
    };
  }

  componentWillMount() {
    this.mounted = true
    this.getRecentMusics(true);
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    if (this.mounted)
      this.props.navigation.addListener('willFocus', () => this.getRecentMusics());
  }

  getRecentMusics() {
    if (this.mounted)
      getRecentTracks().then(data => {
        let recents = []
        let recentsMbid = []
        data.recenttracks.track.map((music) => {
          if (recentsMbid.indexOf(music.mbid) === -1) {
            recents.push(music)
            recentsMbid.push(music.mbid)
          }
        })
        this.setState({
          recentsMusics: recents,
        })
        console.log(recents)
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.data !== this.props.data) {
      this.getRecentMusics()
    }
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
          <View>
            <TouchableOpacity onPress={() => { this.props.navigation.push('MusicLibrary') }} style={styles.listItems}>
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
            <TouchableOpacity onPress={() => { this.props.navigation.push('ArtistLibrary') }} style={styles.listItems} >
              <Icon.Ionicons
                name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
                size={26}
                color='#fff'
              />
              <Text style={styles.items}>Artistas</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.listItems} onPress={() => { this.props.navigation.navigate('AlbunsLibrary') }}>
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
            <Text style={styles.itemsTitle}>Tocadas recentemente</Text>
          </View>
          {this.state.recentsMusics.map(music => {
            return (
              <TouchableOpacity key={music.name} onPress={() => { updateNowPlaying(music.name, music.artist.name).then(() => this.getRecentMusics())  }} style={styles.item}>
                <View style={{flexDirection: 'row'}}>
                <View>
                  <Image
                    style={{ height: 50, width: 50, borderRadius: 10 }}
                    source={{ uri: music.artist.image[2]['#text'] }}
                  />
                </View> 
                <View style={{marginLeft: 10}}>
                  <Text style={styles.musicName}>{music.name}</Text>
                  <Text style={styles.musicArtist}>{music.artist.name}</Text>
                </View>
                </View>

                <TouchableOpacity onPress={() => { music.loved === "1" ?  unloveTrack(music.name, music.artist.name).then(() => this.getRecentMusics()) : loveTrack(music.name, music.artist.name).then(() => this.getRecentMusics()) }} style={{ padding: 10 }}>
                  {music.loved === "1" ? loved : unloved}
                </TouchableOpacity>
              </TouchableOpacity>
            )
          })}
          {/* {this.state.recentsMusics.map(music => {
            return (
              <TouchableOpacity key={music.mbid} onPress={() => { updateNowPlaying(music.name, music.artist.name)}} style={styles.music}>
                {music['@attr'] ? <Text style={styles.items} style={{ color: 'green' }}>{music.name}</Text> : <Text style={styles.items}>{music.name}</Text>}
              </TouchableOpacity>
            )
          })} */}
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
    fontSize: 20,
    
  },
  listItems: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
  },
  contentContainer: {
    paddingTop: 30,
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
  itemsTitle: {
    color: '#888',
    fontSize: 20,
    alignSelf: 'center',
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 20,
  },
});
