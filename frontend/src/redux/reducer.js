import { LOGIN_SUCCESS, LOGIN_FAIL, QUIZ_SUCCESS, FETCHING, QUIZ_FAIL, SIGNUP_SUCCESS, SIGNUP_FAILURE, ACKNOWLEDGEMENT, LOGOUT, NAME_SUCCESS, NAME_FAILURE, SEARCHING_CELEB_DB } from './actions';

const initialState = {

  username: null,
  quizzes: [],
  fetching: false,
  error: null,
  signupStatus: null,
  loginStatus: null,
  nameStatus: null,
  token: null,
  celebObj: null,
  searchingCelebDB: false

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
      return {...state, signupStatus: null, loginStatus: null, nameStatus: null}

    case LOGOUT:
      localStorage.clear();
      return {...state, token: null, username: null}

    case NAME_SUCCESS:
      return {...state, nameStatus: 'SUCCESS', celebObj: action.payload, searchingCelebDB: false}

    case NAME_FAILURE:
      return {...state, nameStatus: 'FAILURE', searchingCelebDB: false}

    case SEARCHING_CELEB_DB:
      return {...state, searchingCelebDB: true}

    default:
      return state;

  }

}
