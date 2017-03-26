import React, { PropTypes } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import * as firebase from "firebase";

const config ={
        apiKey: process.env.FBAPIKEY,
        authDomain:  process.env.FBAUTHDOMAIN,
        databaseURL:  process.env.FBDBURL,
        storageBucket:  process.env.FBSTORAGEBUCKET,
        messagingSenderId: process.env.FBMESSAGINGSENDERID 
}

firebase.initializeApp(config);
const provider = new firebase.auth.GoogleAuthProvider();

export default class TopNavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { user: {} };

        this.userSignedIn()
    }
    /**
     * Prompts user for sign in from Firebase Auth with pop up
     * Sets state's user to user from Firebase
     */
    signIn() {
        const _this = this;

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // The signed-in user info.
            var user = result.user;
            _this.setState({ user: user });
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            console.log(errorMessage);
        });

    }

    /**
     * Signs current user out
     * Sets state's user to an empty object
     */
    signOut() {
        const _this = this;
        firebase.auth().signOut().then(function () {
            _this.setState({ user: {} });
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }
    /**
     * Asks Firebase Auth for the current user
     * Sets state's user to current user
     */
    userSignedIn() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user });
                return true;
            } else {
                this.setState({ user: {} });
                return false;
            }
        });
    }

    render() {
        return (
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Search">Search</Link></li>
                    {this.state.user.displayName == undefined ?
                        <li><button onClick={() => this.signIn()}>Sign In</button></li> :
                        <li><button onClick={() => this.signOut()}>{this.state.user.displayName}</button></li>
                    }
                </ul>
            </nav>
        );
    }
}
