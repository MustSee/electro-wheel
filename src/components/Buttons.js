import React, { Component } from 'react';
import { Button, Icon, Paper } from '@material-ui/core';

const styles = {
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '20px',
    padding: '10px',
  },
  prevButton: {
    marginRight: '10px',
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
      <Paper style={styles.buttonWrapper}>
        <div>
          <Button variant="outlined"
                  style={styles.prevButton}
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
