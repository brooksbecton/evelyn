import React from 'react';
import * as firebase from "firebase";

class FavoriteGuideButton extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            gid: null, //The guide that the fav button is related to 
            uid: null  //The user's id that is trying to favorite
        }
        this.state.gid = props.gid;
        this.state.uid = props.uid;

    }

    //When button is clicked, we'll save the guides id to the user's db
    setFavorite() {
        const gid = this.props.gid;
        const uid = this.props.uid;
        const d = new Date();
        const date = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

        const usersFavGuidesRef = firebase.database().ref('users/' + uid + "/guides/" + gid + "/reviews/");
        usersFavGuidesRef.push({
            date: date,
        });
    }

    render() {
        return (
            <div>{this.props.uid &&
                <button onClick={() => this.setFavorite()}>Favorite</button>
            }
            </div>
        )
    }
}

export default FavoriteGuideButton;