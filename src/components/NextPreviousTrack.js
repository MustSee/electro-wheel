import React, { Component } from "react";
import { Chip, Icon, IconButton, Typography } from "@material-ui/core";

const styles = {
  tracksWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center "
  }
};

class NextPreviousTrack extends Component {
  clickPreviousTrack = () => {
    this.props.previousTrack({ value: -1 });
  };

  clickNextTrack = () => {
    this.props.nextTrack({ value: 1 });
  };

  label = () => {
    return (
      <Typography variant="body1">
        {this.props.trackItemNumber + 1} / {this.props.tracksNumber}
      </Typography>
    );
  };

  render() {
    const { trackItemNumber, tracksNumber } = this.props;
    return (
      <div style={styles.tracksWrapper}>
        <IconButton
          onClick={this.clickPreviousTrack}
          disabled={trackItemNumber === 0}
        >
          <Icon>skip_previous_button</Icon>
        </IconButton>
        <Chip
          label={this.label()}
          variant="outlined"
        />
        <IconButton
          onClick={this.clickNextTrack}
          disabled={trackItemNumber === tracksNumber - 1}
        >
          <Icon>skip_next_button</Icon>
        </IconButton>
      </div>
    );
  }
}

export default NextPreviousTrack;
