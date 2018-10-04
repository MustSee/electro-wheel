import React, { Component } from 'react';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import AppBar from './components/SimpleAppBar';
import MusicInfo from './components/MusicInfo';
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
      isLoading: true,
      musicGenre: '',
      musicGenreIndex: null,
      song: {},
      videoIndex: 0,
      videos: [],
    }
  }

  componentDidMount() {
    this.handleMainClick();
  };

  randomNumber = (max) => {
    return Math.floor(Math.random() * max);
  };

  handleMainClick = () => {
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
    const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${pieceTitle} ${name}&key=${YOUTUBE_API_KEY}`;
    this.handleYoutubeAPI(URL)
  };

  wait = (result) => {
    return new Promise((resolve, reject) => {
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
        console.log('res PLAYLISTITEMS', res);
        let items = [];
        const playlistItems = res.data.items;
        const length = playlistItems.length;
        playlistItems.forEach((item, j) => {
          items[j] = {
            type: 'playlistItem',
            position: item.snippet.position,
            videoId: item.contentDetails.videoId,
            title: item.snippet.title
          }
        });
        console.log('3333', items); // last to log
        let videos = {
          type: 'playlist',
          length,
          playlistId,
          videos: items
        };
        resolve(videos)
      });
    });
  };

  handleYoutubeAPI = (URL) => {
    return new Promise((resolve, reject) => {
      console.log('URL', URL);
      let videos = [];
      axios.get(URL).then((res) => {
        console.log('res', res);
        const results = res.data.items;
        results.forEach((result, i) => {
            if (result.id.kind === 'youtube#video') {
              console.log('i video', i);
              videos[i] = {
                type: 'video',
                videos: [
                  {
                    videoId: result.id.videoId,
                    title: result.snippet.title
                  }
                ]
              };
            } else if (result.id.kind === 'youtube#playlist') {
              console.log('i playlist', i);
              this.wait(result).then((res) => {
                console.log('WAIIIT', res);
                videos[i] = res;
                this.setState({videos});
                console.log('999 FINAL', videos);
              });
            }
          }
        );
        console.log('OUTSIDE FOREACH');

        // this.setState({
        //   videos: firstResult,
        //   isLoading: false,
        //   videoIndex: 0 // Voir si c'est la bonne place pour le resetter à 0
        // });

      });
    });
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
    const { artistName, isLoading, musicGenre, videoIndex, videos } = this.state;
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
                <Video videoId={videos[videoIndex].id.videoId} />
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
