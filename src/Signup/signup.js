import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import * as SignupReducer from './signup.reducer';
import * as actions from './signup.actions';

class Signup extends Component {
  render() {
    return (
      <div id="signUpContainer">
        <div id="signUpBox">
          <form onSubmit={(event) => this.props.submitSignup(event)}>
            <h1 id="signUpHeader">Sign Up</h1>
            <input type="text" name="username" className="form-control" placeholder="Username"/>
            <input type="password" name="password1" className="form-control" placeholder="Password"/>
            <input type="password" name="password2" className="form-control" placeholder="Confirm Password"/>
            <input type="text" name="email" className="form-control" placeholder="Email"/>
            <button type="submit" className="btn btn-success" id="submitSignupButton">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const SignupContainer = ReactRedux.connect(
  state => state.signup,
  actions
)(Signup);

export default SignupContainer;
