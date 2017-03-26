import React, { PropTypes } from 'react';
import axios from 'axios'
import GuideList from './GuideList/GuideList'


class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {topGuides: ''};
        this.getTopGuides();
    }

    //Pulls the top N guides based on hit count 
    getTopGuides(){
        const api_key = process.env.API_KEY;
        const site_id = process.env.SITE_ID;
        const targetUrl = "https://lgapi-us.libapps.com/1.1/guides/?site_id="+
                           site_id + "&key=" + api_key + "&sort_by=count_hit";
        const topGuideCount = 9;

        let topGuides = [];

        axios.get(targetUrl)
        .then(res => {
            let i = 0;

            while(i < topGuideCount){
                topGuides.push(res.data.shift());
                i++;
            }
            this.setState({ topGuides });
        });
    }
    render() {
        return (
            <main>
                <h1>Welcome</h1>
                <GuideList guides={this.state.topGuides}></GuideList>
            </main>
        )
    }
}

export default Welcome;