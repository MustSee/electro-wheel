import React  from "react";
import { Button } from "@material-ui/core";

function Buttons(props) {
  const styles = {
    buttons_previousButton: {
      marginRight: "10px",
      backgroundColor: "#fff"
    },
    buttons_nextButton: {
      backgroundColor: "#fff"
    }
  };

  const { videoIndex, videosLength } = props;

  return (
    <div className="buttons">
      <Button
        variant="outlined"
        size="small"
        style={styles.buttons_previousButton}
        disabled={videoIndex === 0}
        onClick={() => props.handleVideoIndex("previous")}
      >
        Previous
      </Button>
      <Button
        variant="outlined"
        size="small"
        style={styles.buttons_nextButton}
        disabled={videoIndex === videosLength - 1}
        onClick={() => props.handleVideoIndex("next")}
      >
        Next YouTube result
      </Button>
    </div>
  );
}

export default Buttons;
