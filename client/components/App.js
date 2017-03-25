import React, { PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Search from './Search'
import Welcome from './Welcome'
import TopNavBar from './TopNavBar/TopNavBar'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return (
      <Router>
        <div>
          <TopNavBar></TopNavBar>
          <Route exact={true} path="/" component={Welcome}></Route>
          <Route path="/Search" component={Search}></Route>
        </div>
      </Router>
    );
  }
}
