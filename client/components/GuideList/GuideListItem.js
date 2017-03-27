import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from "firebase";

const style = {
    "guideCard": {
        "padding": "15px"
    },
    "divider": {
        "margin-bottom": "10px"
    }
}

export default class GuideListItem extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            guide: undefined, //The current guide object
            userGuide: undefined,// Bool to show whether guide is in users fav list
            showButton: true,  //Bool for showing button or not
            uid: null  //The user's id that is trying to favorite
        }

        this.state.guide = this.props.guide;


        this.state.userGuide = this.props.userGuide;

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ uid: user.uid });
                this.guideFavorited(this.state.guide.id);
            } else {
                this.setState({ uid: '' });
            }
        });
    }



    /**
     * When button is clicked, we'll save the guides id to the user's db
     */
    setFavorite() {
        const gid = this.state.guide.id;
        const uid = this.state.uid;
        const d = new Date();
        const date = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

        const usersFavGuidesRef = firebase.database().ref('users/' + uid + "/guides/" + gid + "/reviews/");
        usersFavGuidesRef.push({
            date: date,
        });

        this.setState({ userGuide: true });
    }

    /**
     * Toggles favorite button to favorite or unfavorite
     */
    toggleButton() {
        let shown = this.state.showButton;
        shown = !shown;
        this.setState({ showButton: shown });
    }

    /**
     * Removes reference on db and togglesButton()
     */
    unSetFavorite() {
        const gid = this.state.guide.id;
        const uid = this.state.uid;

        firebase.database().ref('users/' + uid + "/guides/" + gid + "/reviews/").remove();
        this.setState({ userGuide: false });

    }

    /**
     *  Checkis if a guide is in a users fav list
     *  @param targetGid: the id of the gid you want to check
     */
    guideFavorited(targetGid){
        const usersFavGuidesRef = firebase.database().ref('users/' + this.state.uid + "/guides");
        usersFavGuidesRef.once('value', (snapshot) => {
            for (let gid in snapshot.val()) {
                if(targetGid == gid){
                    this.setState({userGuide: true});
                }
            }
        });
    }

    render() {
        return (
            <div style={style.guideCard}>
                {this.state.guide &&
                    <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                        <CardHeader
                            title={this.state.guide.name}
                            subtitle={this.state.guide.description}
                            actAsExpander={true}
                            showExpandableButton={true}
                        />
                        <CardActions>
                            {this.state.uid &&
                                <span>
                                    {!this.state.userGuide ?
                                        <FlatButton primary={true} onClick={() => this.toggleButton()} onClick={() => this.setFavorite()}>FAVORITE</FlatButton> :
                                        <FlatButton secondary={true} onClick={() => this.toggleButton()} onClick={() => this.unSetFavorite()}>UNFAVORITE</FlatButton>
                                    }
                                </span>
                            }
                            <FlatButton href={this.state.guide.url} target="_blank" label="Read Guide"></FlatButton>
                        </CardActions>
                        <CardText expandable={true}>
                            <Divider style={style.divider} />

                            {this.state.guide.owner &&
                                <div>
                                    <strong>Author: </strong>
                                    <a href={"mailto:" + this.state.guide.owner.email} target="_blank">{this.state.guide.owner.first_name} {this.state.guide.owner.last_name}</a>
                                </div>
                            }
                            <p><strong>Published: </strong>
                                {(this.state.guide.published).split(" ")[0]}</p>
                            <p><strong>Last Updated: </strong>
                                {(this.state.guide.updated).split(" ")[0]}</p>

                            <p><strong>Visits: </strong>
                                {this.state.guide.count_hit}</p>
                        </CardText>
                    </Card>
                }
            </div>
        );
    }
}
