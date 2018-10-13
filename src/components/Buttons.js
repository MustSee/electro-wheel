import React, { Component } from "react";
import { Button } from "@material-ui/core";

const styles = {
  buttons_previousButton: {
    marginRight: "10px",
    backgroundColor: "#fff"
  },
  buttons_nextButton: {
    backgroundColor: "#fff"
  }
};

class Buttons extends Component {
  handleClickOnNextOrPrevious = status => {
    this.props.handleVideoIndex(status);
  };

  render() {
    const { videoIndex, videosLength } = this.props;
    return (
      <div className="buttons">
        <Button
          variant="outlined"
          size="small"
          style={styles.buttons_previousButton}
          disabled={videoIndex === 0}
          onClick={() => this.handleClickOnNextOrPrevious("previous")}
        >
          Previous
        </Button>
        <Button
          variant="outlined"
          size="small"
          style={styles.buttons_nextButton}
          disabled={videoIndex === videosLength - 1}
          onClick={() => this.handleClickOnNextOrPrevious("next")}
        >
          Next YouTube result
        </Button>
      </div>
    );
  }
}

export default Buttons;
