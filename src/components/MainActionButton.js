import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";

const styles = {
  wrapperButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "25px"
  },
  mainButton: {
    height: "40px", // Gérer les différentes tailles d'écrans
    backgroundColor: "#ff9100"
  }
};

class MainActionButton extends Component {
  handleClickOnSearchButton = () => {
    this.props.handleMainSearch();
  };

  render() {
    return (
      <div style={styles.wrapperButton}>
        <Button
          onClick={this.handleClickOnSearchButton}
          variant="extendedFab"
          style={styles.mainButton}
          size="medium"
        >
          <Typography variant="button">Roll the Wheel</Typography>
        </Button>
      </div>
    );
  }
}

export default MainActionButton;
