import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import NavBar from '../components/NavBar';
import config from '../config.js';

import './GamePage.scss';

import dead from '../img/dead.png';
import alive from '../img/dead.png';

import { fetchQuizzes } from '../redux/actions';

class GamePage extends React.Component {

  constructor() {

    super();

    this.state = {

      started: false,
      gameData: [],
      timeLeft: 1.01,
      gameView: true,
      successView: false,
      failView: false,
      completed: false,
      metaData: null

    }

    this.gameStuff = {

      score: 0.0,
      index: 0,
      currentTimers: [],
      stopTime: null,
      streak: 0

    }

  }

  componentDidUpdate(prevProps) {

    if (!this.props.fetching && prevProps.fetching) {

      console.log('getting quiz metadata...');

      axios.get(`${config.backendURL}:${config.backendPort}/api/quiz/${this.props.match.params.id}`)
        .then(res => this.setState({gameData: res.data}, this.getMetaData))
        .catch(err => console.log(err));

    }

  }

  componentDidMount() {

    if (this.props.quizzes.length === 0) {

      console.log('getting quizzes...');
      this.props.fetchQuizzes();

    }

    else {

      console.log('have quizzes. Getting quiz metadata');
      axios.get(`${config.backendURL}:${config.backendPort}/api/quiz/${this.props.match.params.id}`)
        .then(res => this.setState({gameData: res.data}, this.getMetaData))
        .catch(err => console.log(err));

    }

  }

  getMetaData = () => {

    console.log('got metadata');

    const data = this.props.quizzes.find(quiz => {
      return quiz.id == this.props.match.params.id
    });

    this.setState({metaData: data});

  }

  startGame = () => {

    this.setState({started: true}, () => this.gameStuff.currentTimers.push(this.timerFunc()));

  }

  renderGamePreview = () => {

    if (!this.state.metaData)
      return <h1>Getting quiz...</h1>

    console.log(this.state.metaData);

    return (

      <div className='preview'>

        <h2>{this.state.metaData.name}</h2>
        <p className='author'>By <span className='user-link' onClick={e => { e.stopPropagation(); this.props.history.push(`/users/${this.state.metaData.user_id}`) }}>Joe Schmoe</span></p>

        <p>Number of questions: 0</p>

        <button onClick={this.startGame}>Start Game!</button>

      </div>

    );

  }

  renderSuccessView = () => {

    document.querySelector('body').classList.add('correct-bg');

    return (

      <div>
        <h1 className='correct'>Correct!</h1>
        {this.gameStuff.streak === 3 && <h2 className='bonus-txt'>+50 points for 3 correct answers in a row!</h2>}
        {this.gameStuff.streak === 5 && <h2 className='bonus-txt'>+75 points for 5 correct answers in a row!</h2>}
        {this.gameStuff.streak === 10 && <h2 className='bonus-txt'>+100 points for 10 correct answers in a row!</h2>}
        {this.gameStuff.streak === 15 && <h2 className='bonus-txt'>+200 points for 15 correct answers in a row!</h2>}
        {this.gameStuff.streak === this.state.gameData.length && <h2 className='hi-bonus-txt'>+500 points for a perfect game!</h2>}
      </div>

    );

  }

  renderFailView = () => {

    document.querySelector('body').classList.add('incorrect-bg');
    this.gameStuff.streak = 0;
    return <h1 className='incorrect'>Incorrect!</h1>

  }

  check = val => {

    this.gameStuff.stopTime = this.state.timeLeft;

    console.log(this.state.gameData[this.gameStuff.index].date_of_death);

    if (this.state.gameData[this.gameStuff.index].date_of_death) {

      if (!val) {

        this.calculateBonus();

        this.setState({successView: true});

      }

      else
        this.setState({failView: true});

    }

    else {

      if (val) {

        this.calculateBonus();
        this.setState({successView: true});

      }

      else
        this.setState({failView: true});

    }

    this.gameStuff.currentTimers.push(setTimeout(this.nextQuestion, 500));

  }

  calculateBonus = () => {

    this.gameStuff.streak++;

    switch (this.gameStuff.streak) {

      case 3:
        this.gameStuff.score += 50;
        break;

      case 5:
        this.gameStuff.score += 75;
        break;

      case 10:
        this.gameStuff.score += 100;
        break;

      case 15:
        this.gameStuff.score += 200;
        break;

      case this.state.gameData.length:
        this.gameStuff.score += 500;
        break;

    }

  }

  timerFunc = () => {

    this.setState({timeLeft: Number(this.state.timeLeft - 0.01).toFixed(2)}, () => {

      if (this.state.timeLeft > 0)
        this.gameStuff.currentTimers.push(setTimeout(this.timerFunc, 10));

      else {
        this.setState({failView: true}, () => this.gameStuff.currentTimers.push(setTimeout(this.nextQuestion, 250)));
      }

    })

  }

  nextQuestion = () => {

    this.gameStuff.index++;

    this.gameStuff.currentTimers.forEach(timer => clearTimeout(timer));

    this.gameStuff.currentTimers = [];

    if (this.state.successView) {
      this.gameStuff.score += this.gameStuff.stopTime * 100;
    }

    if (this.gameStuff.index !== this.state.gameData.length)
      this.setState({successView: false, failView: false, timeLeft: 1.01}, () => this.gameStuff.currentTimers.push(this.timerFunc()))

    else
      this.setState({started: false, completed: true, timeLeft: 1.01});

  }

  renderGame = () => {

    const { timeLeft, gameData } = this.state;
    const { index } = this.gameStuff;

    if (this.state.successView)
      return this.renderSuccessView();

    if (this.state.failView)
      return this.renderFailView();

    document.querySelector('body').className = '';

    return (

      <div className='game'>

        <h1>{gameData[index].name}</h1>
        <h2>{timeLeft}</h2>
        <img src={gameData[index].image_link} />
        <br />
        <button className='dead' onClick={() => this.check(false)}><img  src={dead}/></button>
        <button className='alive' onClick={() => this.check(true)}><img  src={alive}/></button>

      </div>

    );

  }

  renderComplete = () => {

    document.querySelector('body').className = '';

    return (

      <div className='gameover'>

        <h1>Game over!</h1>
        <h2>Score: {this.gameStuff.score}</h2>
        <button onClick={this.restart}>Play again!</button>

      </div>

    );

  }

  restart = () => {

    this.setState({

      started: false,
      timeLeft: 1.01,
      gameView: true,
      successView: false,
      failView: false,
      completed: false

    });

    this.gameStuff = {

      score: 0.0,
      index: 0,
      currentTimers: [],
      stopTime: null,
      streak: 0

    }

  }

  render() {

    return (

      <>

        <NavBar />

        <div className='game-page'>

          {this.state.started && this.renderGame()}
          {!this.state.started && !this.state.completed && this.renderGamePreview()}
          {this.state.completed && this.renderComplete()}

        </div>

      </>

    )

  }

}

function stateToProps(state) {

  return {

    quizzes: state.quizzes,
    fetching: state.fetching

  }

}

export default connect(stateToProps, { fetchQuizzes })(GamePage);
