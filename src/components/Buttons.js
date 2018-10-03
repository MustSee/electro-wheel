import React, { Component } from 'react';
import { Button, Icon, Paper } from '@material-ui/core';

const styles = {
  bgColor: {
    backgroundColor: '#f5f5f5'
  },
  prevButton: {
    marginRight: '10px',
    backgroundColor: '#fff',
  },
  nextButton: {
    backgroundColor: '#fff',
  }
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
      <Paper className="buttonWrapper" style={styles.bgColor} elevation={2} square={true}>
        <div>
          <Button variant="outlined"
                  style={styles.prevButton}
                  onClick={() => this.handleClickOnNextOrPrevious('previous')}>
            Previous
          </Button>
          <Button variant="outlined"
                  style={styles.nextButton}
                  onClick={() => this.handleClickOnNextOrPrevious('next')}>
            Next
          </Button>
        </div>
      </Paper>
    )
  }
}

export default Buttons;
