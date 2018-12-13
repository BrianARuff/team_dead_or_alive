import React from 'react';
import axios from 'axios';

import config from '../config';

import './QuizPreview.scss';

export default class QuizPreview extends React.Component {

  constructor() {

    super();
    this.state = {

      count: null

    }

  }

  componentDidMount() {

    axios.get(`${config.backendURL}:${config.backendPort}/api/quiz/${this.props.quizData.id}`)
      .then(res => this.setState({count: res.data.length}))
      .catch(err => console.log(err));

  }

  render() {

    const {quizData, history} = this.props;

    if (!this.state.count) {

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
          <p className='author'>Author <span className='user-link' onClick={e => { e.stopPropagation(); history.push(`/users/${quizData.user_id}`) }}><br/>Joe Schmoe</span></p>
          <p>{this.state.count}<br></br>Questions</p>
        </div>

      </div>

    );

  }


}
