import axios from 'axios';

const LOGIN = 'LOGIN';
const QUIZ_SUCCESS = 'QUIZ_SUCCESS';
const QUIZ_FAIL = 'QUIZ_FAIL';
const FETCHING = 'FETCHING';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
const ACKNOWLEDGEMENT = 'ACKNOWLEDGEMENT';

export { LOGIN, QUIZ_SUCCESS, FETCHING, QUIZ_FAIL, SIGNUP_SUCCESS, SIGNUP_FAILURE, ACKNOWLEDGEMENT };

export const login = (user, pass) => dispatch => {

  return {

    type: LOGIN,
    payload: {

      loggedIn: true,
      username: user

    }

  }

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
