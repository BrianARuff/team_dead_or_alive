import React from 'react';
import { connect } from 'react-redux';

import { fetchQuizzes } from '../redux/actions';
import QuizPreview from './QuizPreview';

class QuizList extends React.Component {

  componentDidMount() {

    this.props.fetchQuizzes();

  }

  render() {

    const { quizzes, fetching, error} = this.props;

    if (error)
      return <h1>Error! {error}</h1>;

    if (fetching)
      return <h1>Fetching quizzes...</h1>;

    return (

      <div className='quiz-list'>

        {this.props.quizzes.map((quiz, id) => <QuizPreview key={id} quizData={quiz} />)}

      </div>

    );

  }

}

function stateToProps(state) {

  return {

    quizzes: state.quizzes,
    fetching: state.fetching,
    error: state.error

  }

}

export default connect(stateToProps, { fetchQuizzes })(QuizList);
