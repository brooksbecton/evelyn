import React, {PropTypes} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


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
        <Route path="/Search" component={Search}></Route>
        </div>
      </Router>
    );
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search for a Guide:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}