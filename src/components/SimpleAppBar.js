import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

function SimpleAppBar(props) {
  const { title } = props;
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="title">
          { title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default SimpleAppBar;