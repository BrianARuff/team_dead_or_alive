import React from 'react';
import { Route } from 'react-router-dom';

import NavBar from './NavBar';
import MainPage from '../views/MainPage';
import CreatePage from '../views/CreatePage';

export default function Router() {

  return (

    <>

      <Route exact path='/' render={props => <MainPage {...props} />} />
      <Route path='/create' render={props => <CreatePage {...props} /> } />

    </>

  );

}
