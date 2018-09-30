import React, { Component } from 'react';
import { Button, Icon, Paper } from '@material-ui/core';

const prevButton = {
  marginRight: '10px'
};

class Buttons extends Component {
  handleClickOnNextOrPrevious = (status) => {
    this.props.handleVideoIndex(status);
  };

  handleClickOnSearchButton = () => {
    this.props.handleMainSearch();
  };

  render() {
    return (
      <Paper className="buttonWrapper" elevation={2} square={true}>
        <div>
          <Button variant="outlined"
                  style={prevButton}
                  onClick={() => this.handleClickOnNextOrPrevious('previous')}>
            Previous
          </Button>
          <Button variant="outlined"
                  onClick={() => this.handleClickOnNextOrPrevious('next')}>
            Next
          </Button>
        </div>
        <Button variant="fab" color="secondary" onClick={this.handleClickOnSearchButton}>
          <Icon>search</Icon>
        </Button>
      </Paper>
    )
  }
}

export default Buttons;
