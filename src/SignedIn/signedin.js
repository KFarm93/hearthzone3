import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import * as SignedInReducer from './signedin.reducer';
import * as actions from './signedin.actions';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';


class SignedIn extends Component {
  render() {
    return (
      <div>
        <div id="nav">
          <div id="signed-in">
            <Link to="/signed-in/deck" className="btn btn-info" id="deckButton">My Decks</Link>
            <button onClick={() => this.props.logout()} className="btn btn-danger" id="logoutButton">Log Out</button>
          </div>
          <div id="searchDiv">
            <form id="searchForm" onSubmit={(event) => this.props.search(event)}>
              <input type="text" className="searchBar" name="term"/>
              <button type="submit" className="btn btn-success" id="searchButton">Search</button>
            </form>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

const SignedInContainer = ReactRedux.connect(
  state => state,
  actions
)(SignedIn);


export default SignedInContainer;
