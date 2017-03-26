import React, { PropTypes } from 'react';
import axios from 'axios'
import GuideList from './GuideList/GuideList'
import * as firebase from "firebase";


class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            guides: [],
            //The number of guides displayed on the welcome page
            guideCount: 9 
        };


        this.getUserId();

    }

    //
    getGuideInfo(gid) {
        const api_key = process.env.API_KEY;
        const site_id = process.env.SITE_ID;
        const targetUrl = "//lgapi-us.libapps.com/1.1/guides/" + gid +
            "?site_id=" + site_id +
            "&key=" + api_key;

        return axios.get(targetUrl);

    }

    //Pulls the top N guides based on hit count 
    getTopGuides() {
        const api_key = process.env.API_KEY;
        const site_id = process.env.SITE_ID;
        const targetUrl = "//lgapi-us.libapps.com/1.1/guides/?site_id=" +
            site_id + "&key=" + api_key + "&sort_by=count_hit";



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

    //Gets the guides that the user has already saved
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
                    this.setState({ guides: userGuides });
                });
            });
        });
    }

    getUserId() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const uid = user.uid;
                this.setState({ uid: uid });
                this.getUserGuides();
            } else {
                this.getTopGuides();
            }
        });
    }

    render() {
        return (
            <main >
                <h1>Welcome</h1>
                <GuideList guides={this.state.guides}></GuideList>

            </main >
        )
    }
}

export default Welcome;