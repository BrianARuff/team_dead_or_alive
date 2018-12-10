import { LOGIN, QUIZ_SUCCESS, FETCHING, QUIZ_FAIL } from './actions';

const initialState = {

  username: null,
  quizzes: [],
  fetching: false,
  error: null

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
      console.log(action.payload);
      return {...state, quizzes: action.payload, fetching: false}

    case QUIZ_FAIL:
      return {...state, error: action.payload}

    default:
      return state;

  }

}
