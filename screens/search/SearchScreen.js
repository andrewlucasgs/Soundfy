import React from 'react';
import { ScrollView, StyleSheet, TextInput, View, TouchableOpacity, Text, Image, Platform } from 'react-native';
import { albumSearch, trackSearch, artistSearch, loveTrack, updateNowPlaying } from '../../api/api';
import { Icon } from 'expo';



export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      resultsTrack: [],
      resultsArtist: [],
      resultsAlbum: [],
      lovedMusics: [],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (prevProps.data !== this.props.data) {
      this.forceUpdate()
    }
  }

  searchText = (e) => {
    let text = e.toLowerCase()
    trackSearch(text).then(data => {
      if (!text || text === '') {
        this.setState({
          resultsTrack: []
        })
      } else {
        this.setState({
          resultsTrack: data.results.trackmatches.track
        })
      }
    })
    artistSearch(text).then(data => {
      if (!text || text === '') {
        this.setState({
          resultsArtist: []
        })
      } else {
        this.setState({
          resultsArtist: data.results.artistmatches.artist
        })
      }
    })
    albumSearch(text).then(data => {
      if (!text || text === '') {
        this.setState({
          resultsAlbum: []
        })
      } else {
        this.setState({
          resultsAlbum: data.results.albummatches.album
        })
      }
    })

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

    let id = 0


    return (
      <View style={styles.container}>
        <View style={styles.buscarContainer}>
          <TextInput
            placeholder='Buscar'
            style={styles.buscarField}
            onChangeText={this.searchText.bind(this)}
          />
        </View>
        <ScrollView >
          <View>
            {this.state.resultsTrack.length > 0 ? <Text style={styles.itemsTitle}>Músicas</Text> : <Text />}
          </View>
          {this.state.resultsTrack.map(music => {
            return (
              <TouchableOpacity key={music.name + id++} onPress={() => { updateNowPlaying(music.name, music.artist).then(() => this.props.navigation.push('Player')) }} style={styles.item}>
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Image
                      style={{ height: 50, width: 50, borderRadius: 10 }}
                      source={{ uri: music.image[2]['#text'] }}
                    />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.musicName}>{music.name}</Text>
                    <Text style={styles.musicArtist}>{music.artist}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    loveTrack(music.name, music.artist), this.setState({ lovedMusics: this.state.lovedMusics.push(music) })
                  }}
                  style={{ padding: 10 }}>
                  {unloved}
                </TouchableOpacity>
              </TouchableOpacity>
            )
          })}
          <View>
            {this.state.resultsArtist.length > 0 ? <Text style={styles.itemsTitle}>Artistas</Text> : <Text />}
          </View>

          {this.state.resultsArtist.map(artist => {
            return (
              <TouchableOpacity key={artist.name + id++} style={styles.item}>
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Image
                      style={{ height: 50, width: 50, borderRadius: 10 }}
                      source={{ uri: artist.image[2]['#text'] }}
                    />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.musicName}>{artist.name}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={{ padding: 10 }}>
                  {unloved}
                </TouchableOpacity>
              </TouchableOpacity>
            )
          })}
          <View>
            {this.state.resultsAlbum.length > 0 ? <Text style={styles.itemsTitle}>Álbuns</Text> : <Text />}


          </View>
          {this.state.resultsAlbum.map(album => {
            return (
              <TouchableOpacity key={album.name + id++} style={styles.item}>
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Image
                      style={{ height: 50, width: 50, borderRadius: 10 }}
                      source={{ uri: album.image[2]['#text'] }}
                    />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.musicName}>{album.name}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={{ padding: 10 }}>
                  {unloved}
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
    width: 300,
    borderRadius: 10,
  },
  items: {
    color: '#fff',
    fontSize: 15,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  itemsTitle: {
    color: '#888',
    fontSize: 20,
    alignSelf: 'center',
    paddingLeft: 20,
    marginBottom: 10,
  },
  music: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
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
});
