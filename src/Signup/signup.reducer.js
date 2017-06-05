import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';

const INITIAL_STATE = {
  message: null
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'submitSignup') {
    hashHistory.push("/");
    return Object.assign({}, state, {
      message: null
    })
  }
  if (action.type === 'passwordsDontMatch') {
    return Object.assign({}, state, {
      message: 'Your passwords did not match.'
    })
  }
  if (action.type === 'passwordIncorrect') {
    message: 'Incorrect username or password.'
  }
  return state;
}
