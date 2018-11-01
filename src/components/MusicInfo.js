import React from "react";
import MainActionButton from "./MainActionButton";
import Icon from "@material-ui/core/Icon";

function MusicInfo(props) {
  const { genre, artist, piece } = props;
  return (
    <div className="musicInfo">
      <div className="wrapper">
        <div className="genre ff">{genre.toUpperCase()}</div>
      </div>
      <div className="ninetyPercent wrapper">
        <div className="artistName ff">{artist}</div>
      </div>
      <div className="ninetyPercent wrapper">
        <span>
          <Icon>{piece.type === "album" ? "album" : "music_note"}</Icon>
        </span>
        <div className="title ff">{piece.title}</div>
      </div>
      <MainActionButton handleMainSearch={() => props.handleMainSearch()} />
    </div>
  );
}

export default MusicInfo;
