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
      message: 'ERROR: Values in "Password" and "Confirm Password" fields do not match'
    })
  }
  if (action.type === 'duplicateUsername') {
    return Object.assign({}, state, {
      message: 'ERROR: User already exists'
    })
  }
  return state;
}
