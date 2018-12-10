import axios from 'axios';

const LOGIN = 'LOGIN';
const QUIZ_SUCCESS = 'QUIZ_SUCCESS';
const QUIZ_FAIL = 'QUIZ_FAIL';
const FETCHING = 'FETCHING';

export { LOGIN, QUIZ_SUCCESS, FETCHING, QUIZ_FAIL };

export const login = (user, pass) => {

  // Login logic will go here

  return {

    type: LOGIN,
    payload: {

      loggedIn: true,
      username: user

    }

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
