import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Login from './components/Login';
import Router from './components/Router';

import './App.scss';

class App extends Component {

  render() {
    return (
      <div className="app">
        {!this.props.username ? <Login /> : <BrowserRouter><Router /></BrowserRouter>}
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
