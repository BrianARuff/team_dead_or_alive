import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../redux/actions';

import './NavBar.scss';

class NavBar extends React.Component {

  constructor() {

    super();

    this.state = {

      showUserDropdown: false

    }

  }

  toggleDropdown = () => {

    this.setState({showUserDropdown: !this.state.showUserDropdown});

  }

  renderDropdown = () => {

    return (

      <div className='dropdown'>

        <Link to={`/users/${this.props.userID}`}>Profile</Link>
        <Link to='' onClick={this.props.logout}>Log Out</Link>

      </div>

    );

  }

  render() {

    const {username} = this.props;

    return (

      <div className='navbar'>

        <div className='links'>

          <NavLink activeStyle={{fontWeight: 'bold'}} exact to='/'>Home</NavLink>
          <NavLink activeStyle={{fontWeight: 'bold'}} exact to='/create'>Create Quiz</NavLink>

        </div>

        <span className='user' to='' onClick={this.toggleDropdown}>{username}</span>
        {this.state.showUserDropdown && this.renderDropdown()}

      </div>

    );

  }

}

function stateToProps(state) {

  return {
    username: state.username,
    userID: state.userID
  }

}

export default connect(stateToProps, { logout })(NavBar);
