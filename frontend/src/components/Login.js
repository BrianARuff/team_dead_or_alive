import React from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends React.Component {

  constructor() {

    super();

    this.state = {

      usernameTxt: '',
      passwordTxt: '',
      username: '',
      password: ''

    }

  }

  handleChange = e => {

    this.setState({
      [e.target.name]: e.target.value
    })

  }

  createFormInput = (name, type='text') => {

    return (
      <input
        type={type}
        name={name}
        onChange={this.handleChange}
        placeholder={name}
        value={this.state[name]}
        required
      />);

  }

  handleSubmit = e => {

    e.preventDefault();

    this.props.login(this.state.username, this.state.password);

  }

  render() {

    return (

      <form
        className='login-form'
        onSubmit={this.handleSubmit}>

        {this.createFormInput('username')}
        {this.createFormInput('password')}

        <button>Log In</button>

      </form>

    );

  }

}

export default connect(null, { login })(Login);
