import React, { PropTypes } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import * as firebase from "firebase";

const config = {
    apiKey: process.env.FBAPIKEY,
    authDomain: process.env.FBAUTHDOMAIN,
    databaseURL: process.env.FBDBURL,
    storageBucket: process.env.FBSTORAGEBUCKET,
    messagingSenderId: process.env.FBMESSAGINGSENDERID
}

firebase.initializeApp(config);
const provider = new firebase.auth.GoogleAuthProvider();

export default class TopNavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { user: {}, open: false };

        this.userSignedIn();
        this.handleToggle = this.handleToggle.bind(this);

    }

    handleToggle() {
        this.setState({ open: !this.state.open });
    };

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
                <RaisedButton
                    label="Toggle Drawer"
                    onTouchTap={this.handleToggle}
                />
                <Drawer onTouchTap={this.handleToggle} open={this.state.open}>
                    <Link to="/"><MenuItem>Home</MenuItem></Link>
                    <Link to="/Search"><MenuItem>Search</MenuItem></Link>
                    {this.state.user.displayName == undefined ?
                        <MenuItem onClick={() => this.signIn()}>Sign In</MenuItem> :
                        <MenuItem onClick={() => this.signOut()}>{this.state.user.displayName}</MenuItem>
                    }
                    <MenuItem onTouchTap={this.handleToggle}>Close</MenuItem>
                </Drawer>
            </nav>
        );
    }
}
