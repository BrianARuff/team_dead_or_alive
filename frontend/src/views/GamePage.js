import React from 'react';

import NavBar from '../components/NavBar';

import './GamePage.scss';

class GamePage extends React.Component {

  constructor() {

    super();

    this.state = {

      started: false

    }

  }

  startGame = () => {

    this.setState({started: true});

  }

  renderGamePreview = () => {

    return (

      <div className='preview'>

        <h2>Game Title Goes Here</h2>
        <h4>Author Goes Here</h4>

        <p>Maybe we could have some type of logo image right here</p>

        <p>Number of questions: 0</p>

        <button onClick={this.startGame}>Start Game!</button>

      </div>

    );

  }

  renderGame = () => {

    return (

      <div className='game'>

        <h1>Game</h1>

      </div>

    );

  }

  render() {

    return (

      <>

        <NavBar />

        <div className='game-page'>

          {this.state.started ? this.renderGame() : this.renderGamePreview()}

        </div>

      </>

    )

  }

}

export default GamePage;
