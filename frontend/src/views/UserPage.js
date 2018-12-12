import React from 'react';

import NavBar from '../components/NavBar';

import './UserPage.scss';

function UserPage(props) {

  return (

    <>

      <NavBar />

      <div className='user-page'>

        <h1>Username goes here</h1>

        <div className='quiz-list'>

          <p>User quizzes will go here</p>

        </div>

      </div>

    </>

  );

}

export default UserPage;
