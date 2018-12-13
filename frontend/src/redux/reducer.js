import { LOGIN_SUCCESS, LOGIN_FAIL, QUIZ_SUCCESS, FETCHING, QUIZ_FAIL, SIGNUP_SUCCESS, SIGNUP_FAILURE, ACKNOWLEDGEMENT, LOGOUT, NAME_SUCCESS, NAME_FAILURE, SEARCHING_CELEB_DB, ADD_QUIZ_SUCCESS, ADD_QUIZ_FAIL, ADD_DATA_FAIL } from './actions';

const initialState = {

  username: null,
  quizzes: [],
  fetching: false,
  error: null,
  signupStatus: null,
  loginStatus: null,
  nameStatus: null,
  addQuizStatus: null,
  token: null,
  celebObj: null,
  searchingCelebDB: false,
  userID: null

}

export default function reducer(state = initialState, action) {

  switch(action.type) {

    case LOGIN_SUCCESS:
      localStorage.token = action.payload.token;
      localStorage.username = action.payload.username;
      localStorage.id = action.payload.id;
      return {...state, username: action.payload.username, loginStatus: 'SUCCESS', token: action.payload.token, userID: action.payload.id}

    case LOGIN_FAIL:
      return {...state, loginStatus: 'FAILURE'}

    case FETCHING:
      return {...state, fetching: true}

    case QUIZ_SUCCESS:
      return {...state, quizzes: action.payload, fetching: false}

    case QUIZ_FAIL:
      return {...state, error: action.payload}

    case SIGNUP_SUCCESS:
      return {...state, signupStatus: 'SUCCESS'}

    case SIGNUP_FAILURE:
      return {...state, signupStatus: 'FAILURE'}

    case ACKNOWLEDGEMENT:
      return {...state, signupStatus: null, loginStatus: null, nameStatus: null, addQuizStatus: null}

    case LOGOUT:
      localStorage.clear();
      return {...state, token: null, username: null}

    case NAME_SUCCESS:
      return {...state, nameStatus: 'SUCCESS', celebObj: action.payload, searchingCelebDB: false}

    case NAME_FAILURE:
      return {...state, nameStatus: 'FAILURE', searchingCelebDB: false}

    case SEARCHING_CELEB_DB:
      return {...state, searchingCelebDB: true}

    case ADD_QUIZ_SUCCESS:
      return {...state, addQuizStatus: 'SUCCESS'}

    case ADD_QUIZ_FAIL:
      console.log('add fail');
      return {...state, addQuizStatus: 'FAILURE'}

    case ADD_DATA_FAIL:
      console.log('data fail');
      return {...state, addQuizStatus: 'FAILURE'}

    default:
      return state;

  }

}
