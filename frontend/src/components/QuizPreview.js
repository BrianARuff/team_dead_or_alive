import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import config from '../config';

import './QuizPreview.scss';

class QuizPreview extends React.Component {

  constructor() {

    super();
    this.state = {

      count: null,
      username: null

    }

  }

  componentDidMount() {

    const options = {
        headers: {
          Authorization: this.props.token,
        }
      }

    axios.get(`${config.backendURL}:${config.backendPort}/api/quiz/${this.props.quizData.id}`, options)
      .then(res => this.setState({count: res.data.length}))
      .catch(err => console.log(err));

    axios.get(`${config.backendURL}:${config.backendPort}/api/user/${this.props.quizData.user_id}`, options)
      .then(res => this.setState({username: res.data['0'].username}))
      .catch(err => console.log('ERROR!@#!@#!@#!@#', err));

  }

  render() {

    const {quizData, history} = this.props;

    if (!this.state.count || !this.state.username) {

      return (

        <div className='quiz-preview' onClick={() => history.push(`/game/${quizData.id}`)}>

          <h2>Fetching quiz data...</h2>
          <div className='details'>
            <p className='author'>Author <span className='user-link' onClick={e => { e.stopPropagation(); history.push(`/users/${quizData.user_id}`) }}><br/>Fetching...</span></p>
            <p>Fetching...<br></br>Questions</p>
          </div>

        </div>

      );

    }

    return (

      <div className='quiz-preview' onClick={() => history.push(`/game/${quizData.id}`)}>

        <h2>{quizData.name}</h2>
        <div className='details'>
          <p className='author'>Author <span className='user-link' onClick={e => { e.stopPropagation(); history.push(`/users/${quizData.user_id}`) }}><br/>{this.state.username}</span></p>
          <p>{this.state.count}<br></br>Questions</p>
        </div>

      </div>

    );

  }

}

function stateToProps(state) {

  return {

    token: state.token

  }

}

export default connect(stateToProps, {})(QuizPreview);
