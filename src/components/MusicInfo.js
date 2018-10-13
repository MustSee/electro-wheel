import React, { Component } from "react";
import MainActionButton from "./MainActionButton";
import Icon from "@material-ui/core/Icon";

class MusicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secret: 0,
    }
  }

  handleMainClick = () => {
    this.props.handleMainSearch();
  };

  clickOnGenre = () => {
    this.setState({
      secret: 1
    });
  };

  clickOnArtist = () => {
    if (this.state.secret === 2) {
      this.setState({secret: 3});
      this.props.getSecret(true);
    } else {
      this.setState({secret: 0});
    }
  };

  clickOnTitle = () => {
    if (this.state.secret === 1) {
      this.setState({secret: 2});
    } else if (this.state.secret === 3) {
      this.props.getSecret(false);
    } else {
      this.setState({secret: 0});

    }
  };

  renderIcon = () => {
    const type = this.props.piece.type;
    if (type === "album")
      return (
        <span>
          <Icon>album</Icon>
        </span>
      );
    return (
      <span>
        <Icon>music_note</Icon>
      </span>
    );
  };

  render() {
    const { genre, artist, piece } = this.props;
    return (
      <div className="musicInfo">
        <div className="musicInfo_genre_wrapper" onClick={this.clickOnGenre}>
          <div className="musicInfo_genre">{genre.toUpperCase()}</div>
        </div>
        <div className="musicInfo_artistName_wrapper" onClick={this.clickOnArtist}>
          <div className="musicInfo_artistName">{artist}</div>
        </div>
        <div className="musicInfo_title_wrapper" onClick={this.clickOnTitle}>
          {this.renderIcon()}
          <div className="musicInfo_title">{piece.title}</div>
        </div>
        <MainActionButton handleMainSearch={this.handleMainClick} />
      </div>
    );
  }
}

export default MusicInfo;
