import React from 'react';
import axios from 'axios';

import NavBar from '../components/NavBar';
import config from '../config.js';

import './GamePage.scss';

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
      completed: false

    }

    this.gameStuff = {

      score: 0.0,
      index: 0,
      currentTimers: [],
      stopTime: null

    }

  }

  componentDidMount() {

    axios.get(`${config.backendURL}:${config.backendPort}/api/celebrity_data`)
      .then(res => this.setState({gameData: res.data}))
      .catch(err => console.log(err));

  }

  startGame = () => {

    this.setState({started: true}, () => this.gameStuff.currentTimers.push(this.timerFunc()));

  }

  renderGamePreview = () => {

    return (

      <div className='preview'>

        <h2>Game Title Goes Here</h2>
        <p>By Joe Schmoe</p>

        <p>Maybe we could have some type of logo image right here</p>

        <p>Number of questions: 0</p>

        <button onClick={this.startGame}>Start Game!</button>

      </div>

    );

  }

  renderSuccessView = () => {

    document.querySelector('body').classList.add('correct-bg');

    return <h1 className='correct'>Correct!</h1>

  }

  renderFailView = () => {

    document.querySelector('body').classList.add('incorrect-bg');

    return <h1 className='incorrect'>Incorrect!</h1>

  }

  check = val => {

    this.gameStuff.stopTime = this.state.timeLeft;

    console.log(this.state.gameData[this.gameStuff.index].date_of_death);

    if (this.state.gameData[this.gameStuff.index].date_of_death) {

      if (!val)
        this.setState({successView: true});

      else
        this.setState({failView: true});

    }

    else {

      if (val)
        this.setState({successView: true});

      else
        this.setState({failView: true});

    }

    this.gameStuff.currentTimers.push(setTimeout(this.nextQuestion, 350));

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
        <button className='dead' onClick={() => this.check(false)}>Dead</button>
        <button className='alive' onClick={() => this.check(true)}>Alive</button>

      </div>

    );

  }

  renderComplete = () => {

    document.querySelector('body').className = '';

    return (

      <div className='gameover'>

        <h1>Game over!</h1>
        <h2>Score: {this.gameStuff.score}</h2>

      </div>

    );

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

export default GamePage;
