import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import firebase from "../conf/firebase";
import Video from "./Video";

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  nested1: {
    paddingLeft: theme.spacing.unit * 8
  }
});

class Panels extends React.Component {
  state = {
    isItemContentVisible: {},
    isItemContentVisibleNested1: {},
    finishedLoading: false,
    open: false,
    music: {},
    videoId: 0
  };

  componentDidMount() {
    this.getNewestMusicData();
  }

  getNewestMusicData = () => {
    const ref = firebase.database().ref("music");
    ref.on("value", snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let dataToArray = Object.values(snapshot.val());
        console.log("dataToArray", dataToArray);
        this.setState({
          music: snapshot.val(),
          finishedLoading: true
        });
      }
    });
  };

  handleClick = index => {
    this.setState({
      isItemContentVisible: {
        [index]: !this.state.isItemContentVisible[index]
      },
      isItemContentVisibleNested1: {}
    });

    this.setState(state => ({ open: !state.open }));
  };

  handleClickNested1 = index1 => {
    this.setState({
      isItemContentVisibleNested1: {
        [index1]: !this.state.isItemContentVisibleNested1[index1]
      }
    });
  };

  launchVideo = piece => {
    console.log("pieces", piece);
    if (piece.album) {
      let videoId;
      if (piece.album.video) {
        Object.entries(piece.album.video).filter((value, index) => {
          console.log("df", value);
          if (index === 0) {
            this.setState({ videoId: value[1].videoId });
          }
        });
      }
      // If playlist
    } else if (piece.song) {
      let videoId;
      if (piece.song.video) {
        Object.entries(piece.song.video).filter((value, index) => {
          console.log("dfg", value);
          if (index === 0) {
            this.setState({ videoId: value[1].videoId });
          }
        });
      } else {
        // No good, send Tooltip
        this.setState({videoId: 0});
      }
    }
  };

  renderVideo = () => {
    return (
      <div className="video_video_wrapper">
        <Video videoId={this.state.videoId} />
      </div>
    );
  };

  render() {
    console.log("TTT", this.state.videoId);
    const { classes } = this.props;
    const { music } = this.state;

    const musicList =
      Object.keys(music).length > 0
        ? Object.entries(music).map((value, index) => {
          return (
            <React.Fragment>
              <ListItem
                button
                onClick={() => this.handleClick(index)}
                key={value[0]}
              >
                <ListItemText inset primary={decodeURIComponent(value[0])} />
                {this.state.isItemContentVisible[index] ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )}
              </ListItem>
              {this.state.isItemContentVisible[index]
                ? Object.entries(value[1]).map((value1, index1) => {
                  return (
                    <Collapse
                      in={this.state.isItemContentVisible[index]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding key={value1[0]}>
                        <ListItem
                          button
                          className={classes.nested}
                          key={value1[0]}
                          onClick={() => this.handleClickNested1(index1)}
                        >
                          <ListItemText
                            inset
                            primary={decodeURIComponent(value1[0])}
                          />
                          {this.state.isItemContentVisibleNested1[
                            index1
                            ] ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </ListItem>
                        {this.state.isItemContentVisibleNested1[index1]
                          ? Object.entries(value1[1]).map(
                            (value2, index2) => {
                              return (
                                <Collapse
                                  in={
                                    this.state
                                      .isItemContentVisibleNested1[index1]
                                  }
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <List component="div" disablePadding>
                                    <ListItem
                                      button
                                      className={classes.nested1}
                                      onClick={() =>
                                        this.launchVideo(value2[1])
                                      }
                                    >
                                      <ListItemText
                                        inset
                                        primary={decodeURIComponent(
                                          value2[0]
                                        )}
                                      />
                                    </ListItem>
                                  </List>
                                </Collapse>
                              );
                            }
                          )
                          : null}
                      </List>
                    </Collapse>
                  );
                })
                : null}
            </React.Fragment>
          );
        })
        : null;

    return (
      <React.Fragment>
        <div className="list">
          <List component="nav">{musicList}</List>
        </div>
        <div className="video">
          {this.state.videoId ? this.renderVideo() : null}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Panels);
