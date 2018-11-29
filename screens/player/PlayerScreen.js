import React from 'react';
import { ScrollView, StyleSheet, Image, View, TouchableOpacity, Text, Platform } from 'react-native';
import { getRecentTracks, loveTrack, getSimilar, updateNowPlaying } from '../../api/api';
import { Icon } from 'expo';

export default class PlayerScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props)
    this.state = {
      playing: true,
      playingMusic: '',
      similars: '',
    };
  }

  componentWillMount() {
    this.mounted = true
    this.getRecentMusics();
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    if (this.mounted)
      this.props.navigation.addListener('willFocus', () => this.getRecentMusics());
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.playingMusic !== this.state.playingMusic
  // }
  getRecentMusics() {
    if (this.mounted)
      getRecentTracks().then(data => {
        let [head, ..._tail] = data.recenttracks.track
        console.log(head)

        this.setState({
          playingMusic: head,
          artistName: head.artist.name,
          artist: head.artist,
          playing: head.hasOwnProperty("@attr"),
        })
        this.getSimilarMusic()

      })
  }
  getSimilarMusic() {
    getSimilar(this.state.playingMusic.name, this.state.artistName).then(data => {
      next = Math.floor(Math.random() * 10)
      let similars = data.similartracks.track[next]
      this.setState({
        similars: similars,
      })
    })
  }

  render() {
    const loved =
      <View style={{backgroundColor: '#222', width: 85, alignSelf: 'flex-end'}}>
        <Icon.Ionicons
          name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
          size={30}
          style={{ marginBottom: -3, color: 'red', alignSelf: 'center', }}
        />
        <Text style={{color: 'white', width: 80, textAlign: 'center', alignSelf: 'center',}}>Remover da sua Biblioteca</Text>
      </View>

    const unloved =
      <View style={{backgroundColor: '#222', width: 85}}>
        <Icon.Ionicons
          name={Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'}
          size={30}
          style={{ marginBottom: -3, color: 'white', alignSelf: 'center', }}
        />
        <Text style={{color: 'white', width: 80, textAlign: 'center', alignSelf: 'center',}}>Adicionar a sua Biblioteca</Text>
      </View>

    const playIcon = <Icon.Ionicons
      name={Platform.OS === 'ios' ? 'ios-pause' : 'md-pause'}
      size={50}
      style={{ marginBottom: -3, color: 'white', alignSelf: 'center',  }}
    />;

    const pauseIcon = <Icon.Ionicons
      name={Platform.OS === 'ios' ? 'ios-play' : 'md-play'}
      size={50}
      style={{ marginBottom: -3, color: 'white', alignSelf: 'center',  }}
    />;

    return (
      <View style={styles.container}>
        <View sytles={styles.addLib}>
          <TouchableOpacity onPress={() => { this.state.playingMusic.loved === "1" ? unloveTrack(this.state.playingMusic.name, this.state.artist.name).then(() => this.getRecentMusics()) : loveTrack(this.state.playingMusic.name, this.state.artist.name).then(() => this.getRecentMusics()) }} style={{backgroundColor: '#222', width: 85, alignSelf: 'flex-end'}}>
            {this.state.playingMusic.loved === "1" ? loved : unloved}
          </TouchableOpacity>
        </View>
        <View sytles={styles.player}>
          <View style={styles.musicInfo} >
            <Image
              style={{ height: 280, width: 280, borderRadius: 140, alignSelf: 'center', }}
              source={{ uri: this.state.artist ? this.state.artist.image[2]['#text'] : 'https://cdn1.iconfinder.com/data/icons/metro-ui-dock-icon-set--icons-by-dakirby/512/Music.png' }}
            />
            <Text style={{ color: 'white', fontSize: 30, alignSelf: 'center', }}>{this.state.playingMusic.name}</Text>
            <Text style={{ color: 'white', fontSize: 20, alignSelf: 'center', }}>{this.state.artist ? this.state.artist.name : ''}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action}>
              <Icon.Ionicons
                name={Platform.OS === 'ios' ? 'ios-skip-backward' : 'md-skip-backward'}
                size={50}
                style={{ marginBottom: -3, color: 'white', alignSelf: 'center', }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={() => { this.setState({ playing: !this.state.playing }) }}>
              {this.state.playing ? playIcon : pauseIcon}
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={() => { updateNowPlaying(this.state.similars.name, this.state.similars.artist.name).then(()=> this.getRecentMusics()) }}>
              <Icon.Ionicons
                name={Platform.OS === 'ios' ? 'ios-skip-forward' : 'md-skip-forward'}
                size={50}
                style={{ marginBottom: -3, color: 'white', alignSelf: 'center', }}
              />
            </TouchableOpacity>
          </View>
        </View>
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
  actions: {
    marginTop: 30,
    flexDirection: 'row',
    width: 300,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },

  musicInfo: {
    alignSelf: 'center',
  },
});
