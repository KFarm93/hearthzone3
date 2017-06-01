import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';
import * as LoginReducer from './login.reducer';
import * as actions from './login.actions';
import SignedInContainer from '../SignedIn/signedin';

class Login extends Component {
  render() {
    if (this.props.loggedIn === false) {
      return (
        <div id="signInForm">
          <form onSubmit={event => this.props.submitLogin(event)}>
            <label className="blackText bigger">Username</label><br/>
            <input type="text" name="username"/><br/>
            <label className="blackText bigger">Password</label><br/>
            <input type="password" name="password"/><br/>
            <button type="submit" name="button_login" className="btn" id="loginButton">Login</button>
            <Link to="/signup" className="btn btn-info" id="signUpButton">Sign Up</Link>
          </form>
        </div>
      );
    }
    else {
      return (
        <SignedInContainer/>
      );
    }
  }
}

const LoginContainer = ReactRedux.connect(
  state => state.login,
  actions
)(Login);

export default LoginContainer;
