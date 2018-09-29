import React, { Component } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import './header.css';
import './App.css';
import data from './data';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      musicType: 'ambient',
      albumName: 'another green world',
      message: '',
      videos: [
        {
          id:
            { videoId: '1' }
        },
        {
          id:
            { videoId: '2' }
        },
        {
          id:
            { videoId: '3' }
        },
        {
          id:
            { videoId: '4' }
        },
        {
          id:
            { videoId: '5' }
        },
      ],
      result: null
    }
  }

  componentDidMount() {
    this.handleClickOnButton();
  };

  handleClickOnButton = () => {
    this.setState({isLoading: true, message: ''});
    // 1. from data.length, choose one music type randomly
    const length = data.music.length;
    const randomIndex = Math.floor(Math.random() * length) + 1;
    const randomMusic = data.music[randomIndex - 1];
    this.setState({musicType: randomMusic.musicType}, () => {
      // 2. from specific object, choose random album name.
      const albumsLength = randomMusic.albumName.length;
      const randomIndex2 = Math.floor(Math.random() * albumsLength) + 1;
      const randomAlbum = randomMusic.albumName[randomIndex2 - 1];
      this.setState({albumName: randomAlbum}, () => {
        const {albumName}= this.state;
        this.handleYoutubeAPI(albumName);
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

  handleYoutubeAPI = (albumName) => {
    {/*const API_key = "AIzaSyB5Gb2TJc5CLw0GRFDHOJXoF-HlF0bCP-g";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${albumName}&key=${API_key}` ;

    axios.get(url).then((res) => {
      console.log('res', res);
      console.log(res.data.items)
      this.setState({
        videos: res.data.items,
        isLoading: false,
        result: 0
      });
    }).catch((error) => console.log('error', error)); */}

    this.setState({
      isLoading: false,
      result: 0
    });

  };

  _onReady = (event) => {
    console.log('_onReady');
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  render() {
    const {isLoading, musicType, albumName, result, message }= this.state;
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
          <ul id="albumName">
            <li><a href="#"><span>{albumName}</span></a></li>
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
                videoId={this.state.videos[this.state.result].id.videoId}
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
