import React, {Component} from 'react';
import YouTube from 'react-youtube';
import { Paper } from '@material-ui/core';

class Video extends Component {
  _onReady = (event) => {
  };

  render() {
    const videoId = this.props.videoId;
    const opts = {
      height: '200px',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
      <Paper square={true}>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={this._onReady}
        />
      </Paper>
    );
  }
}

export default Video;
