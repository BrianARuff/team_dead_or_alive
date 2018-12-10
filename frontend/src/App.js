import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Login from './components/Login';

class App extends Component {

  componentDidUpdate() {



  }

  render() {
    return (
      <div className="app">
        {!this.props.username ? <Login /> : <h1>Logged in as {this.props.username}!</h1>}
      </div>
    );
  }
}

function stateToProps(state) {

  return {

    username: state.username

  }

}

export default connect(stateToProps, {})(App);
