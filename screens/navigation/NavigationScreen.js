import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { getTopArtists, getTopTracks, getTopTags, getTopGeo } from '../../api/api';


export default class LibraryScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props)
    this.state = {
      resultsTopTracks: [],
      resultsTopArtists: [],
      resultsTopTags: [],
      resultsTopGeo: [],
    };
  }
  componentDidMount() {
    getTopArtists().then(data => {
      this.setState({
        resultsTopArtists: data.artists.artist
      })
    })
    getTopTracks().then(data => {
      this.setState({
        resultsTopTracks: data.tracks.track
      })
    })
    getTopTags().then(data => {
      this.setState({
        resultsTopTags: data.tags.tag
      })
    })
    getTopGeo().then(data => {
      this.setState({
        resultsTopGeo: data.tracks.track
      })
    })
  }


  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <View>
            <Text style={styles.title}>Recomendadas no Brasil</Text>
          </View>
          <ScrollView horizontal={true}>
            {
              this.state.resultsTopGeo.map(track => {
                return (
                  <TouchableOpacity key={track.name} onPress={() => { updateNowPlaying(track.name, track.artist.name).then(() => this.props.navigation.push('Player'))}} style={styles.listItems}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', width: 100 }}>
                      <Image
                        style={{ height: 80, width: 80, borderRadius: 40 }}
                        source={{ uri: track.image[2]['#text'] }}
                      />
                      <Text style={styles.items}>{track.name}</Text>
                      <Text style={styles.itemsArtist}>{track.artist.name}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>

        </View>
        <View>
          <View>
            <Text style={styles.title}>Gêneros</Text>
          </View>
          <ScrollView horizontal={true}>
            {
              this.state.resultsTopTags.map(tag => {
                return (
                  <TouchableOpacity key={tag.name} style={styles.tags}>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                      <Text style={styles.items}>{tag.name}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
        <View>
          <View>
            <Text style={styles.title}>Músicas mais populares</Text>
          </View>
          <ScrollView horizontal={true}>
            {
              this.state.resultsTopTracks.map(track => {
                return (
                  <TouchableOpacity key={track.name} onPress={() => { updateNowPlaying(track.name, track.artist.name).then(() => this.props.navigation.push('Player'))}} style={styles.listItems}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', width: 100 }}>
                      <Image
                        style={{ height: 80, width: 80, borderRadius: 40 }}
                        source={{ uri: track.image[2]['#text'] }}
                      />
                      <Text style={styles.items}>{track.name}</Text>
                      <Text style={styles.itemsArtist}>{track.artist.name}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
        <View>
          <View>
            <Text style={styles.title}>Artistas mais populares</Text>
          </View>
          <ScrollView horizontal={true}>
            {
              this.state.resultsTopArtists.map(artist => {
                return (
                  <TouchableOpacity key={artist.name} style={styles.listItems}>
                    <View style={{ flexDirection: 'column', alignItems: 'center', width: 100 }}>
                      <Image
                        style={{ height: 80, width: 80, borderRadius: 40 }}
                        source={{ uri: artist.image[2]['#text'] }}
                      />
                      <Text style={styles.items}>{artist.name}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    paddingTop: 30,
  },
  items: {
    color: '#fff',
    alignSelf: 'center',
    textAlign:'center'
  },
  title: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
  },
  itemsArtist: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 10,
  },
  listItems: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
  },
  tags: {
    flexDirection: 'row',
    padding: 15,
    margin: 5,
    backgroundColor: '#474747',
    marginBottom: 20,
  },
  contentContainer: {
    paddingTop: 30,
  },
});
