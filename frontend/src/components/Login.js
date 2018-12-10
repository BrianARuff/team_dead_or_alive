import React from 'react';
import { connect } from 'react-redux';
import { login } from '../redux/actions';

class Login extends React.Component {

  constructor() {

    super();

    this.state = {

      passwordTxt: '',
      username: '',
      password: ''

    }

  }

  handleChange = e => {

    this.setState({
      [e.target.name]: e.target.name === 'password' ? e.target.value.split('').map(char => '*').join('') : e.target.value
    })

    if (e.target.name === 'password') {

      let newPassword = '';

      if (e.target.value.length === 1) {
        this.setState({passwordTxt: e.target.value});
        return;
      }

      else if (e.target.value[e.target.value.length - 1] !== '*' && e.target.value[e.target.value.length - 1] !== undefined)
        newPassword = this.state.passwordTxt + e.target.value[e.target.value.length - 1];

      else
        newPassword = this.state.passwordTxt.slice(0, -1);

      this.setState({
        passwordTxt: newPassword
      });

    }

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

    this.props.login(this.state.username, this.state.passwordTxt);

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
