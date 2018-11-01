import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Random from './components/Random';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Random} />
      </Switch>
    );
  }
}