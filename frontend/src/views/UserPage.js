import React from 'react';

import NavBar from '../components/NavBar';

import './UserPage.scss';

function UserPage(props) {

  return (

    <>

      <NavBar />

      <div className='user-page'>

        <h1>Joe Schmoe</h1>

      </div>

    </>

  );

}

export default UserPage;
