import React, {PropTypes} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Search from './Search'
import Welcome from './Welcome'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Search">Search</Link></li>
          </ul>
        </nav>
        <Route exact={true} path="/" component={Welcome}></Route>
        <Route path="/Search" component={Search}></Route>
        </div>
      </Router>
    );
  }
}
