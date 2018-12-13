import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import NavBar from '../components/NavBar';
import QuizPreview from '../components/QuizPreview';

import { fetchQuizzes } from '../redux/actions';

import config from '../config';

import './UserPage.scss';

class UserPage extends React.Component {

  constructor() {

    super();

    this.state = {

      userData: null,
      userQuizzes: null

    }

  }

  componentDidUpdate(prevProps) {

    if (!this.props.fetching && prevProps.fetching) {

      console.log(this.props.quizzes);
      this.setState({userQuizzes: this.props.quizzes.filter(data => data.user_id == this.props.match.params.id)})

    }

  }

  componentDidMount() {

    const options = {
        headers: {
          Authorization: this.props.token,
        }
      }

    axios.get(`${config.backendURL}:${config.backendPort}/api/user/${this.props.match.params.id}`, options)
      .then(res => this.setState({userData: res.data['0']}, () => {

        console.log('getting quizzes...');
        this.props.fetchQuizzes();

      }))
      .catch(err => console.log('ERROR!@#!@#!@#!@#', err));

  }

  renderUserQuizzes = () => {

    if (!this.state.userQuizzes)
      return <h1>Fetching user quizzes...</h1>

    if (this.state.userQuizzes.length === 0)
      return <h2>This user has not created any quizzes.</h2>

    return <>{this.state.userQuizzes.map((quiz, id) => <QuizPreview key={id} quizData={quiz} history={this.props.history} />)}</>

  }

  render() {

    if (!this.state.userData)
      return <h1>Getting user...</h1>

    return (

      <>

        <NavBar />

        <div className='user-page'>

          <h1>Quizzes by {this.state.userData.username}</h1>

          <div className='quiz-list'>

            {this.renderUserQuizzes()}

          </div>

        </div>

      </>

    );

  }

}

function stateToProps(state) {

  return {

    token: state.token,
    quizzes: state.quizzes,
    fetching: state.fetching

  }

}

export default connect(stateToProps, { fetchQuizzes })(UserPage);
