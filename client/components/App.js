import React, {PropTypes} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import axios from 'axios'

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

function GuideList(props) {
  const guides = props.guides;
  const listItems = guides.map((guide) =>
    <li key={guide.id}>{guide.title.rendered}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', guides: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  searchGuides(q){
    const targetUrl = "http://192.168.0.106/wp-json/wp/v2/posts/";
    axios.get(targetUrl)
      .then(res => {
        const guides = res.data.map(obj => obj);
        this.setState({ guides });
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.searchGuides(this.state.value);
  }


  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search for a Guide:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.guides &&
          <GuideList guides={this.state.guides}></GuideList>
        }
      </div>
    );
  }
}