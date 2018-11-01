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
        <div className="musicInfo_genre_wrapper">
          <div className="musicInfo_genre">{genre.toUpperCase()}</div>
        </div>
        <div className="musicInfo_artistName_wrapper">
          <div className="musicInfo_artistName">{artist}</div>
        </div>
        <div className="musicInfo_title_wrapper">
          {this.renderIcon()}
          <div className="musicInfo_title">{piece.title}</div>
        </div>
        <MainActionButton handleMainSearch={this.handleMainClick} />
      </div>
    );
  }
}

export default MusicInfo;
