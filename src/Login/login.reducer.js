import { hashHistory } from 'react-router';

const INITIAL_STATE = {
  loggedIn: false,
  token: null,
  user: {
    username: null,
    email: null,
    id: null
  },
  message: null
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'login') {
    hashHistory.push("/signed-in/deck");
    return Object.assign({}, state, {
      message: null,
      loggedIn: true,
      token: action.payload.auth_token,
      user: {
        username: action.payload.username,
        email: action.payload.email,
        id: action.payload.id
      }
    })
  }
  if (action.type === 'logout') {
    hashHistory.push("/");
    return Object.assign({}, state, {
      message: null,
      loggedIn: false,
      token: null,
      user: {
        username: null,
        email: null
      }
    });
  }
  if (action.type === 'incorrect') {
    return Object.assign({}, state, {
      message: 'Incorrect password'
    })
  }
  if (action.type === 'userNotFound') {
    return Object.assign({}, state, {
      message: 'User not found'
    })
  }
  return state;
}
