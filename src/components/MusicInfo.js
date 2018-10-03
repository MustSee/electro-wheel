import React, { Component } from 'react';
import MainActionButton from './MainActionButton';
import { Paper, CardContent, Typography, withTheme } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

const styles = {
  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap'

},
  title: {
    marginLeft: '5px'
  }
};

class MusicInfo extends Component {

  handleMainClick = () => {
    this.props.handleMainSearch();
  };

  renderIcon = () => {
    const type = this.props.piece.type;
    if (type === 'album') return <Icon>album</Icon>;
    return <Icon>music_note</Icon>;
  };

  render () {
    const { genre, artist, piece, theme } = this.props;
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
          <Typography variant="headline" gutterBottom align="center" className="capitalize">
            {artist}
          </Typography>
          <div style={styles.titleWrapper}>
            {this.renderIcon()}
            <Typography variant="subheading" gutterBottom align="center" style={styles.title}>
              {piece.title}
            </Typography>
          </div>
          <MainActionButton handleMainSearch={this.handleMainClick}/>
        </CardContent>
      </Paper>
    )
  }
}


export default withTheme()(MusicInfo);