import axios from 'axios';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGOUT = 'LOGOUT';
const QUIZ_SUCCESS = 'QUIZ_SUCCESS';
const QUIZ_FAIL = 'QUIZ_FAIL';
const FETCHING = 'FETCHING';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
const ACKNOWLEDGEMENT = 'ACKNOWLEDGEMENT';

export { LOGIN_SUCCESS, LOGIN_FAIL, QUIZ_SUCCESS, FETCHING, QUIZ_FAIL, SIGNUP_SUCCESS, SIGNUP_FAILURE, ACKNOWLEDGEMENT, LOGOUT };


export const login = (user, pass) => dispatch => {

  axios.post('http://localhost:5000/api/login', { username: user, password: pass})
    .then(res => dispatch({

      type: LOGIN_SUCCESS,
      payload: {
        token: res.data.token,
        username: user
      }

    }))
    .catch(err => dispatch({
      type: LOGIN_FAIL
    }));

}

export const signup = (user, pass) => dispatch => {

  axios.post('http://localhost:5000/api/register', {username: user, password: pass})
    .then(res => dispatch({
      type: SIGNUP_SUCCESS
    }))
    .catch(err => dispatch({
      type: SIGNUP_FAILURE
    }));

}

export const logout = () => {

  return {

    type: LOGOUT

  }

}

export const fetchQuizzes = () => dispatch => {

  // fetching from backend will go here\

  dispatch({
    type: FETCHING
  });

  axios.get('http://localhost:5000/api/dead_or_alive')
    .then(res => dispatch({
      type: QUIZ_SUCCESS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: QUIZ_FAIL,
      payload: err
    }));

}

export const acknowledge = () => {

  return {

    type: ACKNOWLEDGEMENT

  }

}

export const loginToken = () => dispatch => {

  // check token on backend. Until implemented, token will always be accepted.

  dispatch({

    type: LOGIN_SUCCESS,
    payload: {

      token: localStorage.token,
      username: localStorage.username

    }

  })

}
