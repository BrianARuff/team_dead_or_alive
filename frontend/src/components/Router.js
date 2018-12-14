import React from 'react';
import { Route } from 'react-router-dom';

import MainPage from '../views/MainPage';
import CreatePage from '../views/CreatePage';
import GamePage from '../views/GamePage';
import UserPage from '../views/UserPage';

export default function Router() {

  return (

    <>

      <Route exact path='/' render={props => <MainPage {...props} />} />
      <Route path='/create' render={props => <CreatePage {...props} /> } />
      <Route path='/game/:id' render={props => <GamePage {...props } /> } />
      <Route path='/users/:id' render={props => <UserPage {...props } /> } />

    </>

  );

}
