import React from 'react';
import { Card, CardContent, Typography, withTheme } from '@material-ui/core';

function MusicInfo(props) {
  const { genre, artist, title, theme } = props;
  const primary = theme.palette.primary.main;
  return (
      <Card position="static" style={{ backgroundColor: primary, marginTop: '5px', padding: '35px 0' }}>
        <CardContent>
          <Typography variant="display1" gutterBottom align="center">
            {genre.toUpperCase()}
          </Typography>
          <Typography variant="headline" gutterBottom align="center" style={{textTransform: 'capitalize'}}>
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