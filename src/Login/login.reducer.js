import { hashHistory } from 'react-router';

const INITIAL_STATE = {
  loggedIn: false,
  token: null,
  user: {
    username: null,
    email: null,
    id: null
  }
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'login') {
    hashHistory.push("/signed-in");
    return Object.assign({}, state, {
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
      loggedIn: false,
      token: null,
      user: {
        username: null,
        email: null
      }
    });
  }
  return state;
}
