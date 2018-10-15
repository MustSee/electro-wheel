import React from 'react';
import SimpleMenu from './SimpleMenu';

export default class History extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="global">
          <SimpleMenu />
          <div>Inside history mode</div>
        </div>
      </React.Fragment>
    );
  }
}