import React, { Component } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import './header.css';
import './App.css';
// import data from './data';
import data from './correctDataModel';
import dataScript from './dataScript';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      musicType: '',
      artistName: '',
      album: {},
      song: {},
      message: '',
      randomIndex: null,
      videos: [],
      result: null
    }
  }

  componentDidMount() {
    //this.handleClickOnButton();
  };

  randomNumber = (max) => {
    return Math.floor(Math.random() * max);
  };

  handleClickOnButton = () => {
    this.setState({isLoading: true, message: ''});
    // 1. from data.length, choose one music type randomly
    const length = data.music.length;
    let randomIndex = this.randomNumber(length);
    while (randomIndex === this.state.randomIndex) {
       randomIndex = this.randomNumber(length);
    }
    this.setState({randomIndex});
    const randomMusic = data.music[randomIndex];
    console.log('randomMusic', randomMusic);
    this.setState({musicType: randomMusic.musicGenre}, () => {
      // 2. Choose random artist from genre
      const artistsNumber = randomMusic.artists.length;
      const randomArtistIndex = this.randomNumber(artistsNumber);
      const randomArtist = randomMusic.artists[randomArtistIndex].name;
      this.setState({artistName: randomArtist}, () => {
        // 3. from specific artist, choose random album/song name.
        const albumsNumbers = randomMusic.artists[randomArtistIndex].albums.length;
        if (!albumsNumbers) {
          const songsNumbers = randomMusic.artists[randomArtistIndex].songs.length;
          const randomSongIndex = this.randomNumber(songsNumbers);
          const randomSong = randomMusic.artists[randomArtistIndex].songs[randomSongIndex];
          this.setState({song: randomSong}, () => {
            const {title}= this.state.song;
            this.handleYoutubeAPI(this.state.artistName, title);
          });
        }
        const randomAlbumIndex = this.randomNumber(albumsNumbers);
        const randomAlbum = randomMusic.artists[randomArtistIndex].albums[randomAlbumIndex];
        this.setState({album: randomAlbum}, () => {
          const {title}= this.state.album;
          this.handleYoutubeAPI(this.state.artistName, title);
        });
      });
    });
  };

  handleClickOnNextOrPreviousResult = (status) => {
    if (status === 'next') {
      if (this.state.result < this.state.videos.length - 1) {
        this.setState({result: this.state.result + 1, message: ''})
      } else if (this.state.result === this.state.videos.length - 1) {
        this.setState({message: 'Cannot go any further'})
      }
    } else if (status === 'previous') {
      if (this.state.result > 0) {
        this.setState({result: this.state.result - 1, message: ''})
      } else if (this.state.result === 0) {
        this.setState({message: 'Cannot go any further'})
      }
    }
  };

  handleYoutubeAPI = (artistName, albumTitle) => {
    // Checker if artistName contains 'artistes divers'
    const API_key = "AIzaSyB5Gb2TJc5CLw0GRFDHOJXoF-HlF0bCP-g";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${artistName} ${albumTitle}&key=${API_key}` ;

    axios.get(url).then((res) => {
      console.log('res', res);
      console.log(res.data.items);
      // Temporary fix : if we receive PlayList from API, do not include them in videos
      let filteredItems = res.data.items.filter((item) => {
        return !!item.id.videoId;
      });
      console.log('filteredItems', filteredItems);
      this.setState({
        videos: filteredItems,
        isLoading: false,
        result: 0
      });
    }).catch((error) => console.log('error', error));

    {/*
    this.setState({
      isLoading: false,
      result: 0
    });
    */}
  };

  _onReady = (event) => {
    console.log('_onReady');
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  render() {
    console.log(dataScript);
    const {isLoading, musicType, result, message, artistName, videos }= this.state;
    const albumTitle = this.state.album.title;
    const songTitle = this.state.song.title;
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
      <div className="App">
        <div id="header">
          <a href="#" id="musicType">{musicType}</a>
          <div className="artistName">{artistName}</div>
          <ul id="albumName">
            <li><a href="#"><span>{albumTitle ? albumTitle : songTitle}</span></a></li>
          </ul>
          <div className="buttons-wrapper">
            {result === null ? null :
              <React.Fragment>
                <div className="previousAndNext">
                  <button onClick={() => this.handleClickOnNextOrPreviousResult('previous')}>Previous Result</button>
                  <button onClick={() => this.handleClickOnNextOrPreviousResult('next')}>Next Result</button>
                  <div className="message">{message}</div>
                </div>
              </React.Fragment>
            }
            <a className="button" onClick={this.handleClickOnButton}>X</a>
          </div>
          <div className="video">
            {isLoading ? null :
              <YouTube
                videoId={videos[this.state.result].id.videoId}
                opts={opts}
                onReady={this._onReady}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
