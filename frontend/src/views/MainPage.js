import React from 'react';

import NavBar from '../components/NavBar';
import QuizList from '../components/QuizList';

export default function MainPage(props) {

  return (

    <div className='main-page'>

      <h1>Quizzes</h1>

      <QuizList />

    </div>

  );

}
