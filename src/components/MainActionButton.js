import React from "react";
import { Button } from "@material-ui/core";

function MainActionButton(props) {
  const styles = {
    mainActionButton: {
      height: "40px",
      backgroundColor: "#ff9100"
    }
  };

  return (
    <div className="musicInfo_mainActionButton_wrapper">
      <Button
        onClick={() => props.handleMainSearch()}
        style={styles.mainActionButton}
        className="musicInfo_mainActionButton"
        variant="extendedFab"
        size="medium"
      >
        <div className="musicInfo_mainActionButton_title">Roll the Wheel</div>
      </Button>
    </div>
  );
}

export default MainActionButton;
