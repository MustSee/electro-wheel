import React, { Component } from "react";
import { Button } from "@material-ui/core";

const styles = {
  mainActionButton: {
    height: "40px",
    backgroundColor: "#ff9100"
  }
};

class MainActionButton extends Component {
  handleClickOnSearchButton = () => {
    this.props.handleMainSearch();
  };

  render() {
    return (
      <div className="musicInfo_mainActionButton_wrapper">
        <Button
          onClick={this.handleClickOnSearchButton}
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
}

export default MainActionButton;
