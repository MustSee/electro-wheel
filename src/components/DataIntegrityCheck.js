import React, { Component } from "react";
import { Button } from "@material-ui/core";
import firebase from "../conf/firebase";

class DataIntegrityCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idsLength: 0,
      isChecking: false,
      hasId: false,
      isNoGood: false,
    };
  }

  componentDidMount () {
    this.isDataCheckAlreadyDone();
  };

  componentDidUpdate (prevProps) {
    if (this.props !== prevProps) {
      this.isDataCheckAlreadyDone();
    }
  }

  isDataCheckAlreadyDone = () => {
    const { musicGenre, artistName, piece } = this.props.data;
    const { title } = piece;
    // Check if there are already IDs in DF
    const ref = firebase
      .database()
      .ref(`music/${encodeURIComponent(musicGenre)}/${encodeURIComponent(artistName)}/${encodeURIComponent(title)}`);

      ref.once("value", snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach((val) => {
            const value = val.val();
            if (!value.noGood) {
              console.log(value);
              let videoLength = 0;
              let playlistLength = 0;
              if (value.hasOwnProperty('video')) {
                videoLength = Object.keys(value.video).length;
              }
              if (value.hasOwnProperty('playlist')) {
                playlistLength = Object.keys(value.playlist).length;
              }
              this.setState({hasId: true, idsLength: videoLength + playlistLength});
            }
          });
        } else {
          this.setState({hasId: false, idsLength: 0});
        }
      });
    // Check if piece is already tagged "no good"
    const ref2 = firebase
      .database()
      .ref(`music/${encodeURIComponent(musicGenre)}/${encodeURIComponent(artistName)}/${encodeURIComponent(title)}`);

    const payload2 = {"noGood": true};
    ref2
      .orderByChild("noGood")
      .equalTo(payload2.noGood)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(data => {
            const value = data.val();
            if (value.noGood === payload2.noGood) {
              this.setState({isNoGood: true});
            }
          });
        } else {
          this.setState({isNoGood: false});
        }
      });
  };

  handlePush = () => {
    this.setState({ isChecking: true });
    const { musicGenre, artistName, piece, videos } = this.props.data;
    const { title } = piece;
    const type = piece.type;
    const ref = firebase
      .database()
      .ref(`music/${encodeURIComponent(musicGenre)}/${encodeURIComponent(artistName)}/${encodeURIComponent(title)}/${type}/${videos.type}`);

    let payload;
    if (videos.type === "video") {
      payload = {
        videoId: videos.videos[0].videoId,
        title: videos.videos[0].title
      };
      ref
        .orderByChild("videoId")
        .equalTo(payload.videoId)
        .once("value", snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach(data => {
              const value = data.val();
              if (value.videoId !== payload.videoId) {
                ref.push(payload).then(() => {
                  this.isDataCheckAlreadyDone();
                });
              }
            });
            this.setState({ isChecking: false });
          } else {
            ref.push(payload).then(() => {
              this.isDataCheckAlreadyDone();
            });
            this.setState({ isChecking: false });
          }
        });
    } else {
      payload = { playlistId: videos.playlistId, videos: videos.videos };
      ref
        .orderByChild("playlistId")
        .equalTo(payload.playlistId)
        .once("value", snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach(data => {
              const value = data.val();
              if (value.playlistId !== payload.playlistId) {
                ref.push(payload).then(() => {
                  this.isDataCheckAlreadyDone();
                });
              }
            });
            this.setState({ isChecking: false });
          } else {
            ref.push(payload).then(() => {
              this.isDataCheckAlreadyDone();
            });
            this.setState({ isChecking: false });
          }
        });
    }
  };

  handleRemove = () => {
    this.setState({ isChecking: true });
    const { musicGenre, artistName, piece, videos } = this.props.data;
    const { title } = piece;
    const type = piece.type;
    const ref = firebase
      .database()
      .ref(`music/${encodeURIComponent(musicGenre)}/${encodeURIComponent(artistName)}/${encodeURIComponent(title)}/${type}/${videos.type}`);

    let payload;
    if (videos.type === "video") {
      payload = {
        videoId: videos.videos[0].videoId,
        title: videos.videos[0].title
      };
      ref
        .orderByChild("videoId")
        .equalTo(payload.videoId)
        .once("value", snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach(data => {
              ref.child(data.key).remove().then(() => {
                this.isDataCheckAlreadyDone();
              });
            });
          }
          this.setState({ isChecking: false });
        });
    } else {
      payload = { playlistId: videos.playlistId, videos: videos.videos };
      ref
        .orderByChild("playlistId")
        .equalTo(payload.playlistId)
        .once("value", snapshot => {
          if (snapshot.exists()) {
            snapshot.forEach(data => {
              ref.child(data.key).remove().then(() => {
                this.isDataCheckAlreadyDone();
              });
            });
          }
          this.setState({ isChecking: false });
        });
    }
  };

  handleNoGood = () => {
    this.setState({ isChecking: true });
    const { musicGenre, artistName, piece } = this.props.data;
    const { title } = piece;
    const ref = firebase
      .database()
      .ref(`music/${encodeURIComponent(musicGenre)}/${encodeURIComponent(artistName)}/${encodeURIComponent(title)}`);

    const payload = {"noGood": true};
    ref
      .orderByChild("noGood")
      .equalTo(payload.noGood)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(data => {
            const value = data.val();
            if (value.noGood !== payload.noGood) {
              ref.push(payload).then(() => {
                this.isDataCheckAlreadyDone();
              });
            }
            this.setState({ isChecking: false });
          });
        } else {
          ref.push(payload).then(() => {
            this.isDataCheckAlreadyDone();
          });
          this.setState({ isChecking: false });

        }
      });
  };

  handleRemoveNoGood = () => {
    this.setState({ isChecking: true });
    const { musicGenre, artistName, piece } = this.props.data;
    const { title } = piece;
    const ref = firebase
      .database()
      .ref(`music/${encodeURIComponent(musicGenre)}/${encodeURIComponent(artistName)}/${encodeURIComponent(title)}`);

    const payload = {"noGood": true};
    ref
      .orderByChild("noGood")
      .equalTo(payload.noGood)
      .once("value", snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(data => {
            ref.child(data.key).remove().then(() => {
              this.isDataCheckAlreadyDone();
            });
          });
        }
        this.setState({ isChecking: false });
      });
  };

  render() {
    const isChecking = this.state.isChecking;
    return (
      <React.Fragment>
        <div className="dataIntegrityRemoveButton">
          <Button
            variant="contained"
            size="medium"
            onClick={!isChecking ? this.handleRemove : null}
          >
            Suppress IDs
          </Button>
        </div>
        <div className="dataIntegrityPushButton">
          <Button
            variant="contained"
            size="medium"
            onClick={!isChecking ? this.handlePush : null}
          >
            Get IDs
          </Button>
          {this.state.hasId ? <div>has {this.state.idsLength} id</div> : null}
        </div>
        <div className="noGoodResultsButton">
          <Button
            variant="contained"
            size="small"
            onClick={!isChecking ? this.handleNoGood : null}
          >
            No good
          </Button>
          {this.state.isNoGood ? <div>is tagged no good</div> : null}
        </div>
        <div className="RemoveNoGoodResultsButton">
          <Button
            variant="contained"
            size="small"
            onClick={!isChecking ? this.handleRemoveNoGood : null}
          >
            RM No good
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default DataIntegrityCheck;
