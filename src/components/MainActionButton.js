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
    <div className="wrapper">
      <Button
        onClick={() => props.handleMainSearch()}
        style={styles.mainActionButton}
        variant="extendedFab"
        size="medium"
      >
        <div className="mainActionButton_title ff">Roll the Wheel</div>
      </Button>
    </div>
  );
}

export default MainActionButton;
