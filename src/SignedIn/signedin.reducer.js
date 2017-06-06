import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';

const INITIAL_STATE = {
  searchResults: null,
  searchTerm: null
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'search') {
    hashHistory.push("/signed-in/searchResults/" + action.term);
    return Object.assign({}, state, {
      searchTerm: action.payload.term
    })
  }
  if (action.type === 'logout') {
    return Object.assign({}, state, {
      searchResults: null
    })
  }
  if (action.type === 'fetchDeets') {
    return Object.assign({}, state, {
      searchResults: null
    })
  }
  if (action.type === 'logout') {
    return Object.assign({}, state, {
      searchResults: null,
      searchTerm: null
    })
  }
  return state;
}
