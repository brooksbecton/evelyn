import React, { PropTypes } from 'react';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import * as firebase from "firebase";


export default class GuideListItem extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            guide: undefined,
            userGuide: undefined,
            showButton: true,  //Bool for showing button or not
            uid: null  //The user's id that is trying to favorite
        }

        this.state.guide = this.props.guide;
        this.state.userGuide = this.props.userGuide;
        this.state.uid = this.props.uid;
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
    }

    toggleButton(){
        let shown = this.state.showButton;
        shown = !shown;
        this.setState({showButton: shown});
        this.setFavorite()
    }

    render() {
        return (
            <div>
                {this.state.guide &&
                    <Card>
                        <CardHeader
                            title={this.state.guide.name}
                            subtitle={this.state.guide.description}
                        />
                        <CardActions>
                            {!this.state.userGuide && this.state.showButton &&
                                <FlatButton primary={true} onClick={() => this.toggleButton()}>FAVORITE</FlatButton>
                            }
                            <FlatButton href={this.state.guide.url} target="_blank" label="Read More"></FlatButton>
                        </CardActions>
                    </Card>
                }
            </div>
        );
    }
}
