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

        this.setState({

          localList: [...this.state.localList, this.state.celebName],
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

            <form onSubmit={this.handleFormSubmission}>

              <input type='text' name='quizName' placeholder='quiz title' onChange={this.handleChange} value={this.state.quizName} required />

              <form onSubmit={this.handleAddSubmission}>

                {this.state.celebFail && <p>We were unable to find that celebrity in our database. It is possible that you entered a person that is not famous! Please try something else.</p>}
                <input type='text' name='celebName' placeholder='celebrity name' onChange={this.handleChange} value={this.state.celebName} required />
                <button>Add Celebrity!</button>

              </form>

              <button>Create Quiz!</button>

            </form>

            <div className='quiz-display'>

              <h2>{this.state.quizName !== '' ? this.state.quizName : 'Quiz Name'}</h2>

              <ul>

                {this.state.localList.map(celeb => <li>{celeb}</li>)}

              </ul>

            </div>

          </div>

        </div>

      </>

    );

  }

}

function stateToProps(state) {

  return {

    nameStatus: state.nameStatus

  }

}

export default connect(stateToProps, { checkCeleb, acknowledge })(CreatePage);
