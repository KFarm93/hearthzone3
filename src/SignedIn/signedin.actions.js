import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';
import $ from 'jquery';

let BASEURL = 'http://localhost:4000/api';
if (window.location.hostname !== 'localhost') {
  BASEURL = '/api';
}

export function search(event) {
  event.preventDefault();
  let searchTerm = event.target.term.value;
  console.log(searchTerm);
  return function(dispatch) {
    $.ajax({
      type: "GET",
      url: `${BASEURL}/search`,
      headers: {
        term: searchTerm
      }
    })
    .then(data => {
      dispatch({
        type: 'search',
        payload: data,
        term: searchTerm
      })
    })
    .catch(err => {
      let error = (err && err.responseJSON && err.responseJSON.status_message)
      || 'Something went wrong';
      dispatch({
        type: 'error',
        error: error
      });
    });
  };
}

export function logout() {
  console.log("logout");
  return {
    type: 'logout'
  }
}
