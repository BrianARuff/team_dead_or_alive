const LOGIN = 'LOGIN';

export { LOGIN };

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
