import React, { Component } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import AppBar from './components/SimpleAppBar'
import data from './data/musicData';
import './header.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
      artistName: '',
      buttonMessage: '',
      isLoading: true,
      musicGenre: '',
      musicGenreIndex: null,
      song: {},
      videoIndex: 0,
      videos: [],
    }
  }

  componentDidMount() {
    //this.handleClickOnButton();
  };

  randomNumber = (max) => {
    return Math.floor(Math.random() * max);
  };

  handleClickOnButton = () => {
    this.setState({ isLoading: true, buttonMessage: '' });
    // 1. from data.length, choose one music type randomly
    const length = data.music.length;
    let randomMusicGenreIndex = this.randomNumber(length);
    while (randomMusicGenreIndex === this.state.musicGenreIndex) {
      randomMusicGenreIndex = this.randomNumber(length);
    }
    this.setState({ musicGenreIndex: randomMusicGenreIndex });
    const randomMusic = data.music[randomMusicGenreIndex];
    this.setState({ musicGenre: randomMusic.musicGenre }, () => {
      // 2. Choose random artist from genre
      const artistsNumber = randomMusic.artists.length;
      const randomArtistIndex = this.randomNumber(artistsNumber);
      const randomArtist = randomMusic.artists[randomArtistIndex].name;
      this.setState({ artistName: randomArtist }, () => {
        // 3. from specific artist, choose random album/song name.
        const albumsNumbers = randomMusic.artists[randomArtistIndex].albums.length;
        if (!albumsNumbers) {
          const songsNumbers = randomMusic.artists[randomArtistIndex].songs.length;
          const randomSongIndex = this.randomNumber(songsNumbers);
          const randomSong = randomMusic.artists[randomArtistIndex].songs[randomSongIndex];
          this.setState({ song: randomSong, album: {} }, () => {
            const { title } = this.state.song;
            this.handleYoutubeAPI(this.state.artistName, title);
          });
        } else {
          const randomAlbumIndex = this.randomNumber(albumsNumbers);
          const randomAlbum = randomMusic.artists[randomArtistIndex].albums[randomAlbumIndex];
          this.setState({ album: randomAlbum, song: {} }, () => {
            const { title } = this.state.album;
            this.handleYoutubeAPI(this.state.artistName, title);
          });
        }
      });
    });
  };

  handleClickOnNextOrPrevious = (status) => {
    const { videoIndex, videos } = this.state;
    if (status === 'next') {
      if (videoIndex < videos.length - 1) {
        this.setState({ videoIndex: videoIndex + 1, buttonMessage: '' })
      } else if (videoIndex === videos.length - 1) {
        this.setState({ buttonMessage: 'Cannot go any further' })
      }
    } else if (status === 'previous') {
      if (videoIndex > 0) {
        this.setState({ videoIndex: videoIndex - 1, buttonMessage: '' })
      } else if (videoIndex === 0) {
        this.setState({ buttonMessage: 'Cannot go any further' })
      }
    }
  };

  handleYoutubeAPI = (artistName, pieceTitle) => {
    let name = artistName === 'artistes divers' ? '' : artistName;
    const API_key = "AIzaSyB5Gb2TJc5CLw0GRFDHOJXoF-HlF0bCP-g";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${pieceTitle} ${name}&key=${API_key}`;

    axios.get(url).then((res) => {
      // Temporary fix : if we receive PlayList from API, do not include them in videos
      let filteredItems = res.data.items.filter((item) => {
        return !!item.id.videoId;
      });
      this.setState({
        videos: filteredItems,
        isLoading: false,
        videoIndex: 0
      });
    }).catch((error) => console.log('error', error));

    {/*
    this.setState({
      isLoading: false,
      videoIndex: 0
    });
    */
    }
  };

  _onReady = (event) => {
    console.log('_onReady');
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  render() {
    const { artistName, buttonMessage, isLoading, musicGenre, videoIndex, videos } = this.state;
    const albumTitle = this.state.album ? this.state.album.title : null;
    const songTitle = this.state.song ? this.state.song.title : null;
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
      <AppBar title="Electro wheel"/>

    );
  }
}

let html = "      <div className=\"App\">\n" +
  "        <div id=\"header\">\n" +
  "          <a href=\"#\" id=\"musicType\">{musicGenre}</a>\n" +
  "          <div className=\"artistName\">{artistName}</div>\n" +
  "          <ul id=\"albumName\">\n" +
  "            <li><a href=\"#\"><span>{albumTitle ? albumTitle : songTitle}</span></a></li>\n" +
  "          </ul>\n" +
  "          <div className=\"buttons-wrapper\">\n" +
  "            <div className=\"previousAndNext\">\n" +
  "              <button onClick={() => this.handleClickOnNextOrPrevious('previous')}>Previous Result</button>\n" +
  "              <button onClick={() => this.handleClickOnNextOrPrevious('next')}>Next Result</button>\n" +
  "              <div className=\"message\">{buttonMessage}</div>\n" +
  "            </div>\n" +
  "            <a className=\"button\" onClick={this.handleClickOnButton}>X</a>\n" +
  "          </div>\n" +
  "          <div className=\"video\">\n" +
  "            {isLoading ? null :\n" +
  "              <YouTube\n" +
  "                videoId={videos[videoIndex].id.videoId}\n" +
  "                opts={opts}\n" +
  "                onReady={this._onReady}\n" +
  "              />\n" +
  "            }\n" +
  "          </div>\n" +
  "        </div>\n" +
  "      </div>"

export default App;
