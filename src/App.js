import React, { Component } from 'react';
import axios from 'axios';
import { CircularProgress, Typography } from '@material-ui/core';
import AppBar from './components/SimpleAppBar';
import MusicInfo from './components/MusicInfo';
import NextPreviousTrack from './components/NextPreviousTrack';
// import Buttons from './components/Buttons';
import Video from './components/Video';
import data from './data/musicData';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
      artistName: '',
      buttonMessage: '',
      isOnline: true,
      isLoading: true,
      musicGenre: '',
      musicGenreIndex: null,
      song: {},
      trackItemNumber: 0,
      videoIndex: 0,
      videos: [],
    }
  }

  componentDidMount() {
    this.handleMainClick();
  };

  // onlineCheck = () => {
  //   console.log('onlineCheck');
  //   const baseUrl = 'https://www.google.com';
  //   let xhr = new XMLHttpRequest();
  //   return new Promise((resolve, reject)=>{
  //     xhr.onload = () => {
  //       // Set online status
  //       console.log('onlineCheck TRUE');
  //       this.setState({ isOnline: true });
  //       resolve(true);
  //     };
  //     xhr.onerror = () => {
  //       // Set online status
  //       console.log('onlineCheck FALSE');
  //       this.setState({ isOnline: false });
  //       reject(false);
  //     };
  //     xhr.open('GET', baseUrl, true);
  //     xhr.send();
  //   });
  // };

  randomNumber = (max) => {
    return Math.floor(Math.random() * max);
  };

  handleMainClick = () => {
    this.setState({ isLoading: true, trackItemNmber: 0, buttonMessage: '' });
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
            this.prepareURL(this.state.artistName, title);
          });
        } else {
          const randomAlbumIndex = this.randomNumber(albumsNumbers);
          const randomAlbum = randomMusic.artists[randomArtistIndex].albums[randomAlbumIndex];
          this.setState({ album: randomAlbum, song: {} }, () => {
            const { title } = this.state.album;
            this.prepareURL(this.state.artistName, title);
          });
        }
      });
    });
  };

  prepareURL = (artistName, pieceTitle) => {
    // Rajouter full album si c'est un album,
    // Le style de musique si le nom de l'artiste est artiste divers, etc...
    let name = artistName === 'artistes divers' ? '' : artistName;
    const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${pieceTitle} ${name}&key=${YOUTUBE_API_KEY}`;
    this.handleYoutubeAPI(URL)
  };

  waitForItems = (playlistItems) => {
    return new Promise((resolve) => {
      let items = [];
      playlistItems.forEach((item, j) => {
        items[j] = {
          type: 'playlistItem',
          position: item.snippet.position,
          videoId: item.contentDetails.videoId,
          title: item.snippet.title
        }
      });
      resolve(items);
    });
  };

  wait = (result) => {
    return new Promise((resolve) => {
      let playlistId = result.id.playlistId;
      const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
      axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: {
          'maxResults': '25',
          'part': 'snippet,contentDetails',
          'playlistId': playlistId,
          'key': YOUTUBE_API_KEY
        }
      }).then((res) => {
        const playlistItems = res.data.items;
        const length = playlistItems.length;
        this.waitForItems(playlistItems).then((items) => {
          let videos = {
            type: 'playlist',
            length,
            playlistId,
            videos: items
          };
          resolve(videos)
        });
      });
    });
  };

  firstWait = (results) => {
    return new Promise((resolve) => {
      let videos = [];
      let types = [];
      results.forEach((result, i) => {
        if (result.id.kind === 'youtube#video') {
          types.push('video');
          videos[i] = {
            type: 'video',
            videos: [
              {
                videoId: result.id.videoId,
                title: result.snippet.title
              }
            ]
          };
          if (types.length === results.length) {
            resolve(videos);
          }
        } else if (result.id.kind === 'youtube#playlist') {
          this.wait(result).then((res) => {
            videos[i] = res;
            if (videos[0]) {
              resolve(videos);
            }
            //   videoIndex: 0 // Voir si c'est la bonne place pour le resetter à 0
          });
        }
      });
    });
  };

  handleYoutubeAPI = (URL) => {
    axios.get(URL).then((res) => {
      const results = res.data.items;
      // subResults to test playlists
      // const subResults = results.filter((item) => {
      //   if (item.id.kind === 'youtube#playlist') {
      //     return item;
      //   }
      // });
      this.firstWait(results).then((res) => {
        this.setState({ videos: res, isLoading: false });
      });
    });
  };

  clickPreviousAndNextTrack = (payload) => {
    const { trackItemNumber, videoIndex, videos } = this.state;
    if (payload.value > 0 && (trackItemNumber < videos[videoIndex].length - 1)) {
      this.setState({ trackItemNumber: trackItemNumber + payload.value })
    } else if (payload.value < 0 && (trackItemNumber > 0)) {
      this.setState({ trackItemNumber: trackItemNumber + payload.value })
    }
  };

  renderVideo = () => {
    const { videoIndex, videos, trackItemNumber } = this.state;
    if (videos[videoIndex].type === 'video') {
      return (
        <div style={{width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <Typography variant="caption" gutterBottom className="titlePieceTypo">
            {videos[videoIndex].videos[0].title}
          </Typography>
          <Video videoId={videos[videoIndex].videos[0].videoId} />
        </div>
      )
    } else if (videos[videoIndex].type === 'playlist') {
      return (
        <div style={{width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          <Typography variant="caption" gutterBottom>
            {videos[videoIndex].videos[trackItemNumber].title}
          </Typography>
          <Video videoId={videos[videoIndex].videos[trackItemNumber].videoId} />
          <NextPreviousTrack previousTrack={this.clickPreviousAndNextTrack}
                             nextTrack={this.clickPreviousAndNextTrack}
                             trackItemNumber={trackItemNumber}
                             tracksNumber={videos[videoIndex].length}
          />
        </div>
      )
    }
  };

  setVideoIndex = (status) => {
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

  render() {
    const { artistName, isLoading, musicGenre } = this.state;
    const album = this.state.album ? {
      type: 'album',
      title: this.state.album.title
    } : null;
    const song = this.state.song ? {
      type: 'song',
      title: this.state.song.title
    } : null;

    return (
      <React.Fragment>
        <div className="globalContent">
          <AppBar title="Electro Wheel" />
          <MusicInfo genre={musicGenre}
                     artist={artistName}
                     piece={album.title ? album : song}
                     handleMainSearch={this.handleMainClick}
          />
          {/*<Buttons handleVideoIndex={(status) => this.setVideoIndex(status)}*/}
          {/*handleMainSearch={this.handleMainClick}*/}
          {/*buttonMessage={buttonMessage}*/}
          {/*/>*/}
          <div className="videoWrapper">
            {
              isLoading ?
                <CircularProgress color="secondary" thickness={3} size={100} /> :
                this.renderVideo()
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
