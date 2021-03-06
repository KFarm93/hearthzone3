import React from 'react';
import $ from 'jquery';

let BASEURL = 'http://localhost:4000/api';
if (window.location.hostname !== 'localhost') {
  BASEURL = '/api';
}

export function search(term) {
  return function(dispatch) {
    $.ajax({
      type: "GET",
      url: `${BASEURL}/search`,
      headers: {
        term: term
      }
    })
    .then(data => {
      dispatch({
        type: 'search',
        payload: data,
        term: term
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
  return {
    type: 'logout'
  }
}
