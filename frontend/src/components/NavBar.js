import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../redux/actions';

import './NavBar.scss';

function NavBar({logout}) {

  return (

    <div className='navbar'>

      <div className='links'>

        <NavLink activeStyle={{fontWeight: 'bold'}} exact to='/'>Home</NavLink>
        <NavLink activeStyle={{fontWeight: 'bold'}} exact to='/create'>Create Quiz</NavLink>

      </div>

      <Link to='#' onClick={logout}>Log Out</Link>

    </div>

  );

}

export default connect(null, { logout })(NavBar);
