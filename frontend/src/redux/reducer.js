import { LOGIN_SUCCESS, LOGIN_FAIL, QUIZ_SUCCESS, FETCHING, QUIZ_FAIL, SIGNUP_SUCCESS, SIGNUP_FAILURE, ACKNOWLEDGEMENT, LOGOUT } from './actions';

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
      localStorage.token = action.payload.token;
      localStorage.username = action.payload.username;
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

    case LOGOUT:
      localStorage.clear();
      return {...state, token: null, username: null}

    default:
      return state;

  }

}
