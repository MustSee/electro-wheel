import React from "react";
import MainActionButton from "./MainActionButton";
import Icon from "@material-ui/core/Icon";

function MusicInfo(props) {
  const { genre, artist, piece } = props;
  return (
    <div className="musicInfo">
      <div className="musicInfo_genre_wrapper">
        <div className="musicInfo_genre">{genre.toUpperCase()}</div>
      </div>
      <div className="musicInfo_artistName_wrapper">
        <div className="musicInfo_artistName">{artist}</div>
      </div>
      <div className="musicInfo_title_wrapper">
        <span>
          <Icon>{piece.type === "album" ? "album" : "music_note"}</Icon>
        </span>
        <div className="musicInfo_title">{piece.title}</div>
      </div>
      <MainActionButton handleMainSearch={() => props.handleMainSearch()} />
    </div>
  );
}

export default MusicInfo;
