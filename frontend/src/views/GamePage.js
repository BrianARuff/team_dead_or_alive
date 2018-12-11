import React from 'react';
import axios from 'axios';

import NavBar from '../components/NavBar';

import './GamePage.scss';

class GamePage extends React.Component {

  constructor() {

    super();

    this.state = {

      started: false,
      gameData: []

    }

  }

  componentDidMount() {

    axios.get('http://localhost:5000/api/celebrity_data')
      .then(res => this.setState({gameData: res.data}))
      .catch(err => console.log(err));

  }

  startGame = () => {

    this.setState({started: true});

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

  renderGame = () => {

    return (

      <div className='game'>

        {this.state.gameData.map(data => <p>{data.name}</p>)}

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
