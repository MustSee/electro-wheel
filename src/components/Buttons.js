import React from 'react';
import { Button, Icon, Paper } from '@material-ui/core';

const styles = {
  paper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '5px',
    padding: '10px',
  },
  prevButton: {
    marginRight: '10px',
  }


};

function Buttons() {
  return (
    <Paper style={styles.paper}>
      <div>
        <Button variant="outlined" style={styles.prevButton}>
          Previous
        </Button>
        <Button variant="outlined">
          Next
        </Button>
      </div>
      <Button variant="fab" color="secondary">
        <Icon>search</Icon>
      </Button>
    </Paper>
  )
}

export default Buttons;
