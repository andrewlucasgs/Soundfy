import React from 'react';
import { ScrollView, StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { albumSearch, trackSearch, artistSearch } from '../api/api';

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
    };
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
      console.log(data)
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
            <Text style={styles.items}>Músicas</Text>
          </View>
          {this.state.resultsTrack.map(item => {
            return (
              <TouchableOpacity key={item.mbid + item.name} style={styles.music}>
                <Text style={styles.items}>{item.name}</Text>
                <TouchableOpacity style={{ padding: 10 }}>
                  <Text style={{ fontSize: 30, color: music.favorite ? 'green' : 'white' }}>+</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )
          })}
          <View>
            <Text style={styles.items}>Artistas</Text>
          </View>
          {this.state.resultsArtist.map(item => {
            return (
              <TouchableOpacity key={item} style={styles.music}>
                <Text style={styles.items}>{item.name}</Text>
                <TouchableOpacity style={{ padding: 10 }}>
                  <Text style={{ fontSize: 30, color: music.favorite ? 'green' : 'white' }}>+</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            )
          })}
          <View>
            <Text style={styles.items}>álbuns</Text>
          </View>
          {this.state.resultsAlbum.map(item => {
            return (
              <TouchableOpacity key={item.mbid + item.name} style={styles.music}>
                <Text style={styles.items}>{item.name}</Text>
                <TouchableOpacity style={{ padding: 10 }}>
                  <Text style={{ fontSize: 30, color: music.favorite ? 'green' : 'white' }}>+</Text>
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
    width: 300
  },
  items: {
    color: '#fff',
    fontSize: 15,
    alignSelf: 'center',
    paddingLeft: 20,
  },
  music: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
});
