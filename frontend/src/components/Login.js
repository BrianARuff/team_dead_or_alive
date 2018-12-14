import React from 'react';
import { connect } from 'react-redux';
import { login, signup, acknowledge, loginToken } from '../redux/actions';

import './Login.scss';

class Login extends React.Component {

  constructor() {

    super();

    this.state = {

      passwordTxt: '',
      username: '',
      password: '',
      showSignupFail: false,
      showSignupSuccess: false,
      showLoginFail: false

    }

  }

  componentDidMount() {

    // Check if token is invalid, if so, ask for password again and autofill username

    if (localStorage.token) {

      this.setState({username: localStorage.username});
      this.props.loginToken();

    }

  }

  componentDidUpdate(prevProps) {

    if (this.props.signupStatus !== prevProps.signupStatus) {

      if (this.props.signupStatus === 'SUCCESS') {

        this.setState({

          passwordTxt: '',
          username: '',
          password: '',
          showSignupSuccess: true

        });

        this.props.acknowledge();

      }

      if (this.props.signupStatus === 'FAILURE') {

        this.setState({showSignupFail: true});
        this.props.acknowledge();

      }

    }

    if (this.props.loginStatus !== prevProps.loginStatus) {

      if (this.props.loginStatus === 'FAILURE') {

        this.setState({showLoginFail: true});
        this.props.acknowledge();

      }

    }

  }

  handleChange = e => {

    this.setState({
      [e.target.name]: e.target.name === 'password' ? e.target.value.split('').map(char => '*').join('') : e.target.value
    })

    if (e.target.name === 'username' && this.state.showSignupFail)
      this.setState({showSignupFail: false});

    if (e.target.name === 'username' && this.state.showSignupSuccess)
      this.setState({showSignupSuccess: false});

    if (this.state.showLoginFail)
      this.setState({showLoginFail: false});

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
        autoComplete='off'
        required
      />);

  }

  handleSubmit = e => {

    e.preventDefault();

    this.props.login(this.state.username, this.state.passwordTxt);

  }

  signUp = e => {

    e.preventDefault();

    this.props.signup(this.state.username, this.state.passwordTxt);

  }

  render() {

    return (

      <div id="loginForm" className="modal">
        <p>Dead or Alive</p>
        <form onSubmit={this.handleSubmit} className="modal-content animate">
          <div className="container">
            {this.state.showLoginFail && <p className='warning'>Username/Password not recognized. Please try again.</p>}
            {this.state.showSignupFail && <p className='warning'>Username already exists. Pick new username.</p>}
            {this.state.showSignupSuccess && <p className='warning'>Registered!</p>}
            <label htmlFor="uname"><b>Username</b></label>
            {this.createFormInput('username')}

            <label htmlFor="psw"><b>Password</b></label>
            {this.createFormInput('password')}

            <button type="submit">Login</button>
            <button className='signup' onClick={this.signUp}>Sign Up</button>
            <label>
              <input type="checkbox" name="remember" /> Remember me
            </label>
          </div>

          <div className="container" style={{backgroundColor:' #f1f1f1'}}>
            <span className="psw">Forgot <a href="/">password?</a></span>
          </div>
        </form>
      </div>

    );

  }

}

function stateToProps(state) {

  return {

    signupStatus: state.signupStatus,
    loginStatus: state.loginStatus

  }

}

export default connect(stateToProps, { login, signup, acknowledge, loginToken })(Login);
