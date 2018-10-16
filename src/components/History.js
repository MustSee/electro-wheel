import React from 'react';
import SimpleMenu from './SimpleMenu';
import Panels from './Panels';
import './../App.css';

export default class History extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="global">
          <SimpleMenu />
          <Panels />
          <div className="video"></div>
        </div>
      </React.Fragment>
    );
  }
}