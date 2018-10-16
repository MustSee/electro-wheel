import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div className="menu">
        <IconButton
          aria-label="More"
          // aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          elevation={0}
          disableAutoFocusItem
        >
          <Link to='/'>
            <MenuItem onClick={this.handleClose}>Random mode</MenuItem>
          </Link>
          <Link to='/history'>
            <MenuItem onClick={this.handleClose}>History mode</MenuItem>
          </Link>
          {/*<Link to='/disclaimer'>*/}
            {/*<MenuItem onClick={this.handleClose}>Disclaimer</MenuItem>*/}
          {/*</Link>*/}
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;