import React from 'react';

import NavBar from '../components/NavBar';
import QuizList from '../components/QuizList';

import './MainPage.scss';

export default function MainPage({history}) {

  return (

    <>

      <NavBar />

      <div className='main-page'>

        <h1>Quizzes</h1>

        <QuizList history={history} />

      </div>

    </>

  );

}
