import React, { Component } from 'react';
import LoginContainer from '../Login/login';

class Home extends Component {
  render() {
    return (
      <div>
        <div id="bannerDiv">
          <h1 id="header">Hearthzone</h1>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Home;
