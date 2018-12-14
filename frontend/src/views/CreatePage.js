import React from 'react';

import NavBar from '../components/NavBar';
import { connect } from 'react-redux';
import { acknowledge, checkCeleb, addQuiz } from '../redux/actions';

import './CreatePage.scss';

class CreatePage extends React.Component {

  constructor() {

    super();

    this.state = {

      celebName: '',
      celebFail: false,
      localList: [],
      listToSend: [],
      quizName: '',
      quizSuccess: false,
      quizFailure: false

    }

  }

  componentDidUpdate(prevProps, prevState) {

    if (this.props.nameStatus !== prevProps.nameStatus) {

      if (this.props.nameStatus === 'SUCCESS') {

        console.log(this.props.celebObj);
        console.log(this.state.celebName);

        this.setState({

          localList: [...this.state.localList, this.state.celebName],
          listToSend: [...this.state.listToSend, this.props.celebObj],
          celebName: ''

        });

      }

      else if (this.props.nameStatus === 'FAILURE') {

        this.setState({celebFail: true});

      }

      this.props.acknowledge();

    }

    if (this.props.quizStatus !== prevProps.quizStatus) {

      if (this.props.quizStatus === 'SUCCESS') {

        this.setState({
          quizSuccess: true,
          quizFailure: false
        });

      }

      else if (this.props.quizStatus === 'FAILURE') {

        this.setState({quizFailure: true, quizSuccess: false});

      }

      this.props.acknowledge();

    }

    if (this.state.quizSuccess && !prevState.quizSuccess) {

      setTimeout(() => this.setState({quizSuccess: false}), 2000);

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

    this.setState({celebName: this.state.celebName.split(' ').map(item => item.split('').map((char, index) => index === 0 ? char.toUpperCase() : char).join('')).join(' ')}, () => {
      if (!this.props.searchingCelebDB)
        this.props.checkCeleb(this.state.celebName, this.props.token);
    });

  }

  handleFormSubmission = e => {

    e.preventDefault();

    this.props.addQuiz(this.state.quizName, this.state.listToSend, this.props.token, this.props.userID);

    this.setState({

      localList: [],
      listToSend: []

    });

  }

  removeFromList = id => {

    let localList = [...this.state.localList];
    let listToSend = [...this.state.listToSend];
    localList.splice(id, 1);
    listToSend.splice(id, 1);

    this.setState({

      localList: localList,
      listToSend: listToSend

    })

  }

  render() {

    return (

      <>

        <NavBar />

        <div className='create-page'>

          <h1>Create Quiz</h1>
          <p>Use the form below to create your quiz. You can see the quiz name and the added celebrities on the right as you build it. When done click on "Create Quiz!"</p>


          <div className='content'>

            <div className='form-container'>

              <form className='create-form' onSubmit={this.handleFormSubmission}>

              <input type='text' name='quizName' placeholder='Quiz title' onChange={this.handleChange} value={this.state.quizName} required />

                <form onSubmit={this.handleAddSubmission}>

                  <input type='text' name='celebName' placeholder='Celebrity name' onChange={this.handleChange} value={this.state.celebName} required />
                  <br />
                  <button>Add Celebrity!</button>

                </form>

                <button>Create Quiz!</button>

                {this.props.searchingCelebDB && <p>Searching for celebrity...</p>}
                {this.state.celebFail && <p className='fail'>We were unable to find that celebrity in our database. It is possible that you entered a person that is not famous! Please try something else.</p>}
                {this.state.quizSuccess && <p>Quiz success!</p>}
                {this.state.quizFailure && <p className='fail'>Quiz adding failed</p>}

              </form>

            </div>

            <div className='quiz-display'>

              <h2>{this.state.quizName !== '' ? this.state.quizName : 'Quiz Name'}</h2>

              <div className='list-container'>

                <h3>Celebrities:</h3>

                <ul>

                  {this.state.localList.map((celeb, id) => <li key={id}>{celeb}<span onClick={() => this.removeFromList(id)}>X</span></li>)}

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
    searchingCelebDB: state.searchingCelebDB,
    quizStatus: state.addQuizStatus,
    token: state.token,
    userID: state.userID

  }

}

export default connect(stateToProps, { checkCeleb, acknowledge, addQuiz })(CreatePage);
