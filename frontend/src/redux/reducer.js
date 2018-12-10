import { LOGIN, QUIZ_SUCCESS, FETCHING, QUIZ_FAIL, SIGNUP_SUCCESS, SIGNUP_FAILURE, ACKNOWLEDGEMENT } from './actions';

const initialState = {

  username: null,
  quizzes: [],
  fetching: false,
  error: null,
  signupStatus: null

}

export default function reducer(state = initialState, action) {

  switch(action.type) {

    case LOGIN:
      if (action.payload.loggedIn)
        return {...state, username: action.payload.username}
      return state;

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
      return {...state, signupStatus: null}

    default:
      return state;

  }

}
