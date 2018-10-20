import React, { Component } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import MusicInfo from "./components/MusicInfo";
import DataIntegrityCheck from "./components/DataIntegrityCheck";
import NextPreviousTrack from "./components/NextPreviousTrack";
import Buttons from "./components/Buttons";
import Video from "./components/Video";
import data from "./data/musicData";
import "./App.css";
import { choosePieceAndFindTitle, randomNumber, findNewIndex } from "./toolbox";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      album: {},
      artistName: "",
      buttonMessage: "",
      isOnline: true,
      isLoading: true,
      musicGenre: "",
      musicGenreIndex: null,
      secret: false,
      song: {},
      trackItemNumber: 0,
      videoIndex: 0,
      videos: [
        {
          videos: []
        }
      ],
      videosLength: 0
    };
  }

  componentDidMount() {
    this.handleMainClick();
  }

  getSecret = secretState => {
    this.setState({ secret: secretState });
  };

  handleMainClick = async () => {
    this.setState({
      isLoading: true,
      trackItemNumber: 0,
      buttonMessage: "",
      videoIndex: 0
    });

    // 1. choose one music genre randomly - Music Genre -> MG
    const { musicGenreIndex } = this.state;
    const MGNumber = data.music.length;
    const newMGIndex = await findNewIndex(musicGenreIndex, MGNumber);
    const musicGenre = data.music[newMGIndex];
    // 2. Choose random artist from genre
    const artistsNumber = musicGenre.artists.length;
    const artistIndex = await randomNumber(artistsNumber);
    const artist = musicGenre.artists[artistIndex];
    const artistName = artist.name;
    // 3. from specific artist, choose random album/song name.
    const piece = await choosePieceAndFindTitle(artist);

    this.setState({
      musicGenreIndex: newMGIndex,
      musicGenre: musicGenre.musicGenre,
      artistName: artistName,
      album: piece.album,
      song: piece.song
    });

    this.prepareURL(artistName, piece.title);
  };

  prepareURL = (artistName, pieceTitle) => {
    // Rajouter full album si c'est un album,
    // Le style de musique si le nom de l'artiste est artiste divers, etc...
    let name = artistName === "artistes divers" ? "" : artistName;
    const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${pieceTitle} ${name}&key=${YOUTUBE_API_KEY}`;
    this.handleYoutubeAPI(URL);
  };

  waitForItems = playlistItems => {
    return new Promise(resolve => {
      let items = [];
      playlistItems.forEach((item, j) => {
        items[j] = {
          type: "playlistItem",
          position: item.snippet.position,
          videoId: item.contentDetails.videoId,
          title: item.snippet.title
        };
      });
      resolve(items);
    });
  };

  wait = result => {
    return new Promise(resolve => {
      let playlistId = result.id.playlistId;
      const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
      axios
        .get("https://www.googleapis.com/youtube/v3/playlistItems", {
          params: {
            maxResults: "25",
            part: "snippet,contentDetails",
            playlistId: playlistId,
            key: YOUTUBE_API_KEY
          }
        })
        .then(res => {
          const playlistItems = res.data.items;
          const length = playlistItems.length;
          this.waitForItems(playlistItems).then(items => {
            let videos = {
              type: "playlist",
              length,
              playlistId,
              videos: items
            };
            resolve(videos);
          });
        });
    });
  };

  firstWait = results => {
    return new Promise(resolve => {
      let videos = [];
      let types = [];
      results.forEach((result, i) => {
        if (result.id.kind === "youtube#video") {
          types.push("video");
          videos[i] = {
            type: "video",
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
        } else if (result.id.kind === "youtube#playlist") {
          this.wait(result).then(res => {
            videos[i] = res;
            if (videos[0]) {
              resolve(videos);
            }
          });
        }
      });
    });
  };

  handleYoutubeAPI = URL => {
    axios.get(URL).then(res => {
      const results = res.data.items;
      this.firstWait(results).then(res => {
        this.setState({ videos: res, isLoading: false });
      });
    });
  };

  clickPreviousAndNextTrack = payload => {
    const { trackItemNumber, videoIndex, videos } = this.state;
    if (payload.value > 0 && trackItemNumber < videos[videoIndex].length - 1) {
      this.setState({ trackItemNumber: trackItemNumber + payload.value });
    } else if (payload.value < 0 && trackItemNumber > 0) {
      this.setState({ trackItemNumber: trackItemNumber + payload.value });
    }
  };

  renderVideo = () => {
    const { videoIndex, videos, trackItemNumber } = this.state;
    if (videos[videoIndex].type === "video") {
      return (
        <div className="video_video_wrapper">
          <Video videoId={videos[videoIndex].videos[0].videoId} />
        </div>
      );
    } else if (videos[videoIndex].type === "playlist") {
      return (
        <div className="video_video_wrapper">
          <Video
            videoId={videos[videoIndex].videos[trackItemNumber].videoId}
            nextTrack={this.clickPreviousAndNextTrack}
            trackItemNumber={trackItemNumber}
            tracksNumber={videos[videoIndex].length}
          />
          <NextPreviousTrack
            previousTrack={this.clickPreviousAndNextTrack}
            nextTrack={this.clickPreviousAndNextTrack}
            trackItemNumber={trackItemNumber}
            tracksNumber={videos[videoIndex].length}
          />
        </div>
      );
    }
  };

  setVideoIndex = status => {
    const { videoIndex, videos } = this.state;
    if (status === "next") {
      if (videoIndex < videos.length - 1) {
        this.setState({ videoIndex: videoIndex + 1, buttonMessage: "" });
      }
    } else if (status === "previous") {
      if (videoIndex > 0) {
        this.setState({ videoIndex: videoIndex - 1, buttonMessage: "" });
      }
    }
  };

  render() {
    console.log('this.state', this.state);
    const {
      artistName,
      buttonMessage,
      isLoading,
      musicGenre,
      videos,
      videoIndex
    } = this.state;
    const album = this.state.album
      ? {
          type: "album",
          title: this.state.album.title
        }
      : null;
    const song = this.state.song
      ? {
          type: "song",
          title: this.state.song.title
        }
      : null;

    // payloadData for integrity check
    let payload = {
      musicGenre,
      artistName,
      piece: album.title ? album : song,
      videos: videos[videoIndex]
    };

    return (
      <React.Fragment>
        <div className="global">
          {this.state.secret ? <DataIntegrityCheck data={payload} /> : null}
          <MusicInfo
            genre={musicGenre}
            artist={artistName}
            piece={album.title ? album : song}
            handleMainSearch={this.handleMainClick}
            getSecret={this.getSecret}
          />
          <Buttons
            handleVideoIndex={status => this.setVideoIndex(status)}
            videoIndex={videoIndex}
            videosLength={videos.length}
            buttonMessage={buttonMessage}
          />
          <div className="video">
            {isLoading ? (
              <div className="video_circularProgress">
                <CircularProgress color="secondary" thickness={3} size={100} />
              </div>
            ) : (
              this.renderVideo()
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
