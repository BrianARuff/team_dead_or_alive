import React from 'react';

import NavBar from '../components/NavBar';
import { connect } from 'react-redux';
import { acknowledge, checkCeleb } from '../redux/actions';

import './CreatePage.scss';

class CreatePage extends React.Component {

  constructor() {

    super();

    this.state = {

      celebName: '',
      celebFail: false,
      localList: [],
      quizName: ''

    }

  }

  componentDidUpdate(prevProps) {

    if (this.props.nameStatus !== prevProps.nameStatus) {

      if (this.props.nameStatus === 'SUCCESS') {

        console.log(this.props.celebObj);

        this.setState({

          localList: [...this.state.localList, this.props.celebObj],
          celebName: ''

        });

      }

      else if (this.props.nameStatus === 'FAILURE') {

        this.setState({celebFail: true});

      }

      this.props.acknowledge();

    }

  }

  handleChange = e => {

    if (this.state.celebFail)
      this.setState({celebFail: false});

    this.setState({

      [e.target.name]: e.target.value

    })

  }

  handleAddSubmission = e => {

    e.preventDefault();
    e.stopPropagation();

    this.props.checkCeleb(this.state.celebName);

  }

  handleFormSubmission = e => {

    e.preventDefault();

    // Send list to server

  }

  render() {

    return (

      <>

        <NavBar />

        <div className='create-page'>

          <h1>Create Quiz</h1>

          <div className='content'>

            <div className='form-container'>

              <form className='create-form' onSubmit={this.handleFormSubmission}>

              <input type='text' name='quizName' placeholder='Quiz title' onChange={this.handleChange} value={this.state.quizName} required />

                <form onSubmit={this.handleAddSubmission}>

                  <input type='text' name='celebName' placeholder='celebrity name' onChange={this.handleChange} value={this.state.celebName} required />
                  <br />
                  <button>Add Celebrity!</button>

                </form>

                <button>Create Quiz!</button>

                {this.props.searchingCelebDB && <p>Searching for celebrity...</p>}
                {this.state.celebFail && <p className='fail'>We were unable to find that celebrity in our database. It is possible that you entered a person that is not famous! Please try something else.</p>}

              </form>

            </div>

            <div className='quiz-display'>

              <h2>{this.state.quizName !== '' ? this.state.quizName : 'Quiz Name'}</h2>

              <div className='list-container'>

                <h3>Celebrities:</h3>

                <ul>

                  {this.state.localList.map(celeb => <li key={celeb.id}>{celeb.name}</li>)}

                </ul>

              </div>

            </div>

          </div>

        </div>

      </>

    );

  }

}

function stateToProps(state) {

  return {

    nameStatus: state.nameStatus,
    celebObj: state.celebObj,
    searchingCelebDB: state.searchingCelebDB

  }

}

export default connect(stateToProps, { checkCeleb, acknowledge })(CreatePage);
