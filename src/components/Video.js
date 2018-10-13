import React, { Component } from "react";
import YouTube from "react-youtube";

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
      height: "75%",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={this._onReady}
          onEnd={this._onEnd}
        />
    );
  }
}

export default Video;
