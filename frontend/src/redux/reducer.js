import { LOGIN } from './actions';

const initialState = {

  username: null

}

export default function reducer(state = initialState, action) {

  switch(action.type) {

    case LOGIN:
      if (action.payload.loggedIn)
        return {...state, username: action.payload.username}
      return state;

    default:
      return state;

  }

}
