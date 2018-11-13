import { API_KEY } from "./config";

BASE = 'http://ws.audioscrobbler.com/2.0';
  album_search_string = (arg) => this.BASE + '/?method=album.search&album=' + arg + '&api_key=' + API_KEY + '&format=json&limit=3';
  artist_search_string = (arg) => this.BASE + '/?method=artist.search&artist=' + arg + '&api_key=' + API_KEY + '&format=json&limit=3';
  track_search_string = (arg) => this.BASE + '/?method=track.search&track=' + arg + '&api_key=' + API_KEY + '&format=json&limit=3';

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


module.exports = {albumSearch, artistSearch, trackSearch};