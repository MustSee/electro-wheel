import React from "react";
import { Chip, Icon, IconButton, Typography } from "@material-ui/core";

const label = (trackItemNumber, tracksNumber) => {
  return (
    <Typography variant="body1">
      {trackItemNumber + 1} / {tracksNumber}
    </Typography>
  );
};

function NextPreviousTrack(props) {
    const { trackItemNumber, tracksNumber } = props;

    return (
      <div className="video_tracks_wrapper">
        <IconButton
          onClick={() => props.previousTrack({ value: -1 })}
          disabled={trackItemNumber === 0}
        >
          <Icon>skip_previous_button</Icon>
        </IconButton>
        <Chip label={label(trackItemNumber, tracksNumber)} variant="outlined" />
        <IconButton
          onClick={() => props.nextTrack({ value: 1 })}
          disabled={trackItemNumber === tracksNumber - 1}
        >
          <Icon>skip_next_button</Icon>
        </IconButton>
      </div>
    );
}

export default NextPreviousTrack;
