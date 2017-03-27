import React, { PropTypes } from 'react';
import axios from 'axios'
import GuideList from './GuideList/GuideList'
import * as firebase from "firebase";
const provider = new firebase.auth.GoogleAuthProvider();

import RaisedButton from 'material-ui/RaisedButton';


class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guides: [],
            userGuides: [],
            //The number of guides displayed on the welcome page
            guideCount: 9
        };


        this.getUserId();

    }

    /**
     * Queries LibGuide for guide based on guide id
     * @param {Number} gid
     * @return {Promise} guide
     */
    getGuideInfo(gid) {
        const api_key = process.env.API_KEY;
        const site_id = process.env.SITE_ID;
        const targetUrl = "//lgapi-us.libapps.com/1.1/guides/" + gid +
            "?site_id=" + site_id +
            "&key=" + api_key + 
            "&expand=owner";

        return axios.get(targetUrl);

    }
    /**
     * Pulls the top N guides based on hit count, where N is the state's guideCount
     * Sets state's guides to top guide
     */
    getTopGuides() {
        const api_key = process.env.API_KEY;
        const site_id = process.env.SITE_ID;
        const targetUrl = "//lgapi-us.libapps.com/1.1/guides/?site_id=" +
            site_id + "&key=" + api_key + "&sort_by=count_hit&expand=owner";

        let topGuides = [];

        axios.get(targetUrl)
            .then(res => {
                let i = 0;

                while (i < this.state.guideCount) {
                    topGuides.push(res.data.shift());
                    i++;
                }
                this.setState({ guides: topGuides });
            });
    }

    /**
     * Queries Firebase DB for user's guide ID's then pulls each guide form LibGuide
     * Sets state's guide to the user's guide returned. 
     */
    getUserGuides() {
        let userGuidesIds = [];
        let userGuides = [];

        const usersFavGuidesRef = firebase.database().ref('users/' + this.state.uid + "/guides/");
        usersFavGuidesRef.once('value', (snapshot) => {
            for (let gid in snapshot.val()) {
                userGuidesIds.push(gid);
            }

            userGuidesIds.map((gid) => {
                this.getGuideInfo(gid).then(res => {
                    userGuides.push(res.data[0]);
                    this.setState({ userGuides: userGuides });
                });
            });
        });
    }

    /**
     * Getting current user from firebase auth
     * then getting user's guide if signed in
     * otherwise getting the top guides. 
     */
    getUserId() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid;
                this.setState({ uid: uid });
                this.getUserGuides();
            }
            this.getTopGuides();
        });
    }

    signIn() {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // The signed-in user info.
            var user = result.user;
            _this.setState({ uid: user.uid });
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorMessage);
        });
    }

    render() {
        return (
            <main >
                <h1>Welcome</h1>
                {this.state.guides && this.state.userGuides &&
                    <GuideList guides={this.state.guides} userGuides={this.state.userGuides}></GuideList>
                }
                {!this.state.uid &&
                    <RaisedButton onClick={this.signIn} label="Sign In"></RaisedButton>
                }
            </main >
        )
    }
}

export default Welcome;