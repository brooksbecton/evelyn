import React, { PropTypes } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import * as firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCU9lLaUVE7v-hiDdQVjGjvRStdw-6XH50",
  authDomain: "evelyn-f9eb7.firebaseapp.com",
  databaseURL: "https://evelyn-f9eb7.firebaseio.com",
  storageBucket: "evelyn-f9eb7.appspot.com",
  messagingSenderId: "255158556452"
};
firebase.initializeApp(config);
const provider = new firebase.auth.GoogleAuthProvider();

import Search from './Search'
import Welcome from './Welcome'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { user: {} };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);

    this.userSignedIn()
  }
  signIn() {
    const _this = this;

    firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      _this.setState({ user: user });
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorMessage);
    });

  }

  signOut() {
    const _this = this;
    firebase.auth().signOut().then(function () {
      _this.setState({ user: {} });
    }, function (error) {
      console.error('Sign Out Error', error);
    });
  }

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
      <Router>
        <div>
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
          <Route exact={true} path="/" component={Welcome}></Route>
          <Route path="/Search" component={Search}></Route>
        </div>
      </Router>
    );
  }
}
