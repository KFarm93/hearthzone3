import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';

const INITIAL_STATE = {

};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'submitSignup') {
    hashHistory.push("/");
  }
  return state;
}
