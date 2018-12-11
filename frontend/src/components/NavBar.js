import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {

  return (

    <div className='navbar'>

      <NavLink activeStyle={{fontWeight: 'bold'}} exact to='/'>Home</NavLink>
      <NavLink activeStyle={{fontWeight: 'bold'}} to='/create'>Create Quiz</NavLink>

    </div>

  );

}
