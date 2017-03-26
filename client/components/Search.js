import React, { PropTypes } from 'react';
import axios from 'axios'

import GuideList from './GuideList/GuideList'


class Search extends React.Component {
    constructor(props) {
      super(props);
      this.state = { value: '', guides: '' };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    /**
     * Pulls the top N guides based on hit count, where N is the state's guideCount
     * Sets state's guides to top guide
     */
    searchGuides(q) {
      const api_key = process.env.API_KEY;
      const site_id = process.env.SITE_ID;
      const targetUrl = "//lgapi-us.libapps.com/1.1/guides/?site_id=" +
        site_id + "&key=" + api_key + "&search_terms=" + q;
      axios.get(targetUrl)
        .then(res => {
          const guides = res.data.map(obj => obj);
          this.setState({ guides });
        });
    }

    /**
     * Listens for input change for searching and updates state's value with the changed value
     */
    handleChange(event) {
      this.setState({ value: event.target.value });
    }

    /**
     * Stops default submit process and queries LibGuides for Guides
     * based on state's value
     */
    handleSubmit(event) {
      event.preventDefault();
      this.searchGuides(this.state.value);
    }


    render() {
      return (
        <main>
          <h1>Search Guides</h1>
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
        </main>
      );
    }
}

export default Search;