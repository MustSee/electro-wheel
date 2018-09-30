import React from 'react';
import { Paper, CardContent, Typography, withTheme } from '@material-ui/core';

function MusicInfo(props) {
  const { genre, artist, title, theme } = props;
  const primary = theme.palette.primary.main;
  return (
      <Paper position="static"
             style={{ backgroundColor: primary}}
             className="musicInfoWrapper"
             square={true}
      >
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
      </Paper>
  )
}

export default withTheme()(MusicInfo);