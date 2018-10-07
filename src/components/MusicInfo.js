import React, { Component } from "react";
import MainActionButton from "./MainActionButton";
import Icon from "@material-ui/core/Icon";

class MusicInfo extends Component {
  handleMainClick = () => {
    this.props.handleMainSearch();
  };

  renderIcon = () => {
    const type = this.props.piece.type;
    if (type === "album")
      return (
        <div>
          <Icon>album</Icon>
        </div>
      );
    return (
      <div>
        <Icon>music_note</Icon>
      </div>
    );
  };

  render() {
    const { genre, artist, piece } = this.props;
    return (
      <div className="musicInfo">
        <div className="musicInfo_genreWrapper">
          <div className="musicInfo_genre">{genre.toUpperCase()}</div>
        </div>
        <div className="musicInfo_artistNameWrapper">
          <div className="musicInfo_artistName">{artist}</div>
        </div>
        <div className="musicInfo_titleWrapper">
          {this.renderIcon()}
          <div className="musicInfo_title">{piece.title}</div>
        </div>
        <MainActionButton handleMainSearch={this.handleMainClick} />
      </div>
    );
  }
}

export default MusicInfo;
