import React, { Component } from "react";
import { Button, Paper } from "@material-ui/core";

const styles = {
  bgColor: {
    backgroundColor: "#fff",
    background: "linear-gradient(#fff, #f5f5f5)",
    paddingBottom: 5
},
  prevButton: {
    marginRight: "10px",
    backgroundColor: "#fff"
  },
  nextButton: {
    backgroundColor: "#fff"
  }
};

class Buttons extends Component {
  handleClickOnNextOrPrevious = status => {
    this.props.handleVideoIndex(status);
  };

  render() {
    const {videoIndex, videosLength} = this.props;
    return (
      <Paper
        className="buttonWrapper"
        style={styles.bgColor}
        elevation={0}
        square={true}
      >
        <div>
          <Button
            variant="outlined"
            size="small"
            style={styles.prevButton}
            disabled={videoIndex === 0}
            onClick={() => this.handleClickOnNextOrPrevious("previous")}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="small"
            style={styles.nextButton}
            disabled={videoIndex === videosLength - 1}
            onClick={() => this.handleClickOnNextOrPrevious("next")}
          >
            Next YouTube result
          </Button>
        </div>
      </Paper>
    );
  }
}

export default Buttons;
