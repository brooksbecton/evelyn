import React, { PropTypes } from 'react';
import * as firebase from "firebase";

import FavoriteGuideButton from './FavoriteGuideButton'

class GuideList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {uid: null};
        this.getUserId();
    }

    /**
     * Asks Firebase Auth for the current user
     * Sets state's uid to current user's uid
     */
    getUserId() {
        firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            const uid = user.uid;
            this.setState({ uid: uid });
        } else {
            // User is signed out.
            // ...
        }
        });
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
                        <FavoriteGuideButton uid={this.state.uid} gid={guide.id}></FavoriteGuideButton>
                    </li>
                })
                }</ul>
        )
    }
}

export default GuideList;