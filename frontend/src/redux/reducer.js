import { LOGIN_SUCCESS, LOGIN_FAIL, QUIZ_SUCCESS, FETCHING, QUIZ_FAIL, SIGNUP_SUCCESS, SIGNUP_FAILURE, ACKNOWLEDGEMENT } from './actions';

const initialState = {

  username: null,
  quizzes: [],
  fetching: false,
  error: null,
  signupStatus: null,
  loginStatus: null,
  token: null

}

export default function reducer(state = initialState, action) {

  switch(action.type) {

    case LOGIN_SUCCESS:
      return {...state, username: action.payload.username, loginStatus: 'SUCCESS', token: action.payload.token}

    case LOGIN_FAIL:
      return {...state, loginStatus: 'FAILURE'}

    case FETCHING:
      return {...state, fetching: true}

    case QUIZ_SUCCESS:
      return {...state, quizzes: [action.payload], fetching: false}

    case QUIZ_FAIL:
      return {...state, error: action.payload}

    case SIGNUP_SUCCESS:
      return {...state, signupStatus: 'SUCCESS'}

    case SIGNUP_FAILURE:
      return {...state, signupStatus: 'FAILURE'}

    case ACKNOWLEDGEMENT:
      return {...state, signupStatus: null, loginStatus: null}

    default:
      return state;

  }

}
