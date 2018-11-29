import { API_KEY, API_SECRET, PASSWORD, USERNAME } from "./config";
import md5 from 'md5';
var parseString = require('react-native-xml2js').parseString;


BASE = 'http://ws.audioscrobbler.com/2.0';
album_search_string = (arg) => this.BASE + '/?method=album.search&album=' + arg + '&api_key=' + API_KEY + '&format=json&limit=3';
artist_search_string = (arg) => this.BASE + '/?method=artist.search&artist=' + arg + '&api_key=' + API_KEY + '&format=json&limit=3';
track_search_string = (arg) => this.BASE + '/?method=track.search&track=' + arg + '&api_key=' + API_KEY + '&format=json&limit=3';
top_track_string = () => this.BASE + '/?method=chart.gettoptracks&api_key=' + API_KEY + '&format=json&limit=10';
top_artist_string = () => this.BASE + '/?method=chart.gettopartists&api_key=' + API_KEY + '&format=json&limit=10';
top_tags_string = () => this.BASE + '/?method=chart.gettoptags&api_key=' + API_KEY + '&format=json&limit=10';
top_geo_string = () => this.BASE + '/?method=geo.gettoptracks&country=brazil&api_key=' + API_KEY + '&format=json&limit=10';

albumSearch = async (arg) => {
  const response = await fetch(this.album_search_string(arg))
  const json = await response.json();
  return json
};

artistSearch = async (arg) => {
  const response = await fetch(this.artist_search_string(arg))
  const json = await response.json();
  return json
};

trackSearch = async (arg) => {
  const response = await fetch(this.track_search_string(arg))
  const json = await response.json();
  return json
};


getTopTracks = async () => {
  const response = await fetch(this.top_track_string())
  const json = await response.json();
  return json
}

getTopArtists = async () => {
  const response = await fetch(this.top_artist_string())
  const json = await response.json();
  return json
}

getTopTags = async () => {
  const response = await fetch(this.top_tags_string())
  const json = await response.json();
  return json
}

getTopGeo = async () => {
  const response = await fetch(this.top_geo_string())
  const json = await response.json();
  return json
}
signatureAPI = (body) => {
  string = ''
  Object.keys(body).sort().forEach(function (key) {
    string += (key + body[key])
  });
  string += API_SECRET
  return md5(string)
}

getMobileSession = async () => {
  let key
  body = {
    method: 'auth.getMobileSession',
    username: USERNAME,
    password: PASSWORD,
    api_key: API_KEY,
  }
  API_SIGNATURE = signatureAPI(body)
  let response = await fetch('https://ws.audioscrobbler.com/2.0?method=auth.getMobileSession&username=' + USERNAME + '&password=' + PASSWORD + '&api_key=' + API_KEY + '&api_sig=' + API_SIGNATURE, {
    method: 'POST'
  })
    .then((data) => {
      let xml = data._bodyText;
      let result = parseString(xml, (err, result) => { window.key = result.lfm.session[0].key[0] })

    })
  key = window.key
  return (key)
}

loveTrack = async (track, artist) => {

  sessionKey = await getMobileSession()
  body = {
    method: 'track.love',
    track: track,
    artist: artist,
    api_key: API_KEY,
    sk: sessionKey
  }

  fetch('https://ws.audioscrobbler.com/2.0?method=track.love&track=' + track + '&artist=' + artist + '&api_key=' + API_KEY + '&api_sig=' + signatureAPI(body) + '&sk=' + sessionKey, { method: 'POST' }).then((res)=>console.log(res) )

}

unloveTrack = async (track, artist) => {

  sessionKey = await getMobileSession()
  body = {
    method: 'track.unlove',
    track: track,
    artist: artist,
    api_key: API_KEY,
    sk: sessionKey
  }

  fetch('https://ws.audioscrobbler.com/2.0?method=track.unlove&track=' + track + '&artist=' + artist + '&api_key=' + API_KEY + '&api_sig=' + signatureAPI(body) + '&sk=' + sessionKey, { method: 'POST' }).then((res)=>console.log(res) )

}

updateNowPlaying = async (track, artist) => {
  sessionKey = await getMobileSession()
  body = {
    method: 'track.updatenowplaying',
    track: [track],
    artist: [artist],
    api_key: API_KEY,
    sk: sessionKey
  }

  fetch('https://ws.audioscrobbler.com/2.0?method=track.updatenowplaying&track=' + [track] + '&artist=' + [artist] + '&api_key=' + API_KEY + '&api_sig=' + signatureAPI(body) + '&sk=' + sessionKey, { method: 'POST' })
    .then(async function (res) {
      scrobble(track, artist)
    })

}

scrobble = async (track, artist) => {

  sessionKey = await getMobileSession()
  body = {
    method: 'track.scrobble',
    track: track,
    artist: artist,
    api_key: API_KEY,
    timestamp: ((Date.now()/1000)-(4 * 60 * 1000)).toString(),
    sk: sessionKey
  }

  fetch('https://ws.audioscrobbler.com/2.0?method=track.scrobble&track=' + track + '&artist=' + artist + '&timestamp=' + body.timestamp + '&api_key=' + API_KEY + '&api_sig=' + signatureAPI(body) + '&sk=' + sessionKey, { method: 'POST' })

}



getLovedTrack = async () => {
  const response = await fetch('http://ws.audioscrobbler.com/2.0/?method=user.getlovedtracks&user=' + USERNAME + '&api_key=' + API_KEY + '&format=json')
  const json = await response.json();
  return json
}

getRecentTracks = async () => {
  const response = await fetch('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + USERNAME + '&api_key=' + API_KEY + '&format=json&limit=15&extended=1')
  const json = await response.json();
  return json
}



getSimilar =  async (track, artist) => {
  console.log(track + "------------------------------" + artist)
  const response = await fetch('https://ws.audioscrobbler.com/2.0?method=track.getsimilar&track=' + track + '&artist=' + artist + '&api_key=' + API_KEY + '&format=json&limit=50')
  const json = await response.json();
  return json
}


module.exports = {
  albumSearch,
  artistSearch,
  trackSearch,
  getTopArtists,
  getTopTracks,
  getTopTags,
  getTopGeo,
  getLovedTrack,
  loveTrack,
  unloveTrack,
  updateNowPlaying,
  getRecentTracks,
  scrobble,
  getSimilar
};