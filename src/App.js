import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Random from './components/Random';
import History from './components/History';

export default class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Random} />
        <Route path='/history' component={History} />
      </Switch>
    );
  }
}