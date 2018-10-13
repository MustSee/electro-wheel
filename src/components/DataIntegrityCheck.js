import React, { Component } from "react";
import { Button } from "@material-ui/core";
import firebase from "../conf/firebase";

class DataIntegrityCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecking: false
    }
  }

  handlePush = () => {
    this.setState({isChecking: true});
    const { musicGenre, artistName, piece, videos } = this.props.data;
    const { title } = piece;
    const type = piece.type + "s";
    const ref = firebase
      .database()
      .ref(`music/${musicGenre}/${artistName}/${type}/${title}/${videos.type}`);

    let payload;
    if (videos.type === "video") {
      payload = {
        videoId: videos.videos[0].videoId,
        title: videos.videos[0].title
      };
      ref.orderByChild('videoId').equalTo(payload.videoId).once("value", snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(data => {
            const value = data.val();
            if (value.videoId !== payload.videoId) {
              ref.push(payload);
            }
          });
          this.setState({isChecking: false});
        } else {
          ref.push(payload);
          this.setState({isChecking: false});
        }
      });
    } else {
      payload = { playlistId: videos.playlistId, videos: videos.videos };
      ref.orderByChild('playlistId').equalTo(payload.playlistId).once("value", snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(data => {
            const value = data.val();
            if (value.playlistId !== payload.playlistId) {
              ref.push(payload);
            }
          });
          this.setState({isChecking: false});
        } else {
          ref.push(payload);
          this.setState({isChecking: false});
        }
      });
    }
  };

  handleRemove = () => {
    this.setState({isChecking: true});
    const { musicGenre, artistName, piece, videos } = this.props.data;
    const { title } = piece;
    const type = piece.type + "s";
    const ref = firebase
      .database()
      .ref(`music/${musicGenre}/${artistName}/${type}/${title}/${videos.type}`);

    let payload;
    if (videos.type === "video") {
      payload = {
        videoId: videos.videos[0].videoId,
        title: videos.videos[0].title
      };
      ref.orderByChild('videoId').equalTo(payload.videoId).once("value", snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach((data) => {
              ref.child(data.key).remove();
          });
        }
        this.setState({isChecking: false});
      });
    } else {
      payload = { playlistId: videos.playlistId, videos: videos.videos };
      ref.orderByChild('playlistId').equalTo(payload.playlistId).once("value", snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach((data) => {
              ref.child(data.key).remove();
          });
        }
        this.setState({isChecking: false});
      });
    }
  };

  render() {
    const isChecking = this.state.isChecking;
    return (
      <React.Fragment>
        <div className="dataIntegrityRemoveButton">
          <Button variant="contained" size="medium" onClick={!isChecking ? this.handleRemove : null}>
            Suppress IDs
          </Button>
        </div>
        <div className="dataIntegrityPushButton">
          <Button variant="contained" size="medium" onClick={!isChecking ? this.handlePush : null}>
            Get IDs
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default DataIntegrityCheck;
