import React, { PropTypes } from 'react';
import * as firebase from "firebase";

import GuideListItem from './GuideListItem'

class GuideList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guides: [],
            userGuides: [],
            uid: null
        };

        this.state.guides = this.props.guides;
        this.state.userGuides = this.props.userGuides;
        this.state.uid = this.props.uid;

        this.getUserId();
    }

    /**
     * Removes userGuides from guides to avoid duplicate entries
     */
    filterDuplicateGuides() {
        let newGuides = [];
        if (this.state.userGuides) {
            this.state.userGuides.map((guide) => {
                this.state.guides.map((g, i) => {
                    if (guide.id != g.id) {
                        newGuides.push(g);
                    }
                });
                this.setState({guides: newGuides});
            });
        }

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
        this.filterDuplicateGuides();   
        return (
            <ul>
                {this.props.userGuides&&
                    this.props.userGuides.map((guide) => {
                        return <GuideListItem key={guide.id} guide={guide} userGuide={true} uid={this.state.uid}></GuideListItem>
                    })
                }
                {this.props.guides&&
                    this.props.guides.map((guide) => {
                        return <GuideListItem key={guide.id} userGuide={false} guide={guide} uid={this.state.uid}></GuideListItem>
                    })
                }
            </ul>
        )
    }
}

export default GuideList;