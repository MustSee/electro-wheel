import React from 'react';
import { Card, CardContent, Typography, withTheme } from '@material-ui/core';

function MusicInfo(props) {
  const { genre, artist, title, theme } = props;
  const primary = theme.palette.primary.main;
  console.log('primary', primary);
  return (
      <Card position="static" style={{ backgroundColor: primary, marginTop: '5px', padding: '35px' }}>
        <CardContent>
          <Typography variant="display1" gutterBottom align="center">
            {genre}
          </Typography>
          <Typography variant="headline" gutterBottom align="center">
            {artist}
          </Typography>
          <Typography variant="subheading" gutterBottom align="center">
            {title}
          </Typography>
        </CardContent>
      </Card>
  )
}

export default withTheme()(MusicInfo);