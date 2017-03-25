import React, { PropTypes } from 'react';
import axios from 'axios'

const env = require('./../env.js')

class GuideList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul>{this.props.guides &&
                this.props.guides.map((guide) => {
                    return <li key={guide.id}>
                        <a href={guide.url} target="_blank">{guide.name}</a>
                        <p>{guide.description}</p>
                        <p>Last Updated: {(guide.updated).split(" ")[0]}</p>
                        <p>Hits: {guide.count_hit}</p>
                    </li>
                })
                }</ul>
        )
    }
}

export default GuideList;