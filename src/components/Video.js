import React, { Component } from "react";
import YouTube from "react-youtube";
import { Paper } from "@material-ui/core";

class Video extends Component {
  _onReady = event => {
    // console.log('_onReady');
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
  };

  _onEnd = () => {
    const { trackItemNumber, tracksNumber } = this.props;
    if (trackItemNumber < tracksNumber - 1) {
      this.props.nextTrack({ value: 1 });
    }
  };

  render() {
    const { videoId } = this.props;
    const opts = {
      height: "200px",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
      <Paper square={true}>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={this._onReady}
          onEnd={this._onEnd}
        />
      </Paper>
    );
  }
}

export default Video;
