import React from 'react';
import $ from 'jquery';

export function search(term) {
  return function(dispatch) {
    $.ajax({
      type: "GET",
      url: "http://localhost:4000/search",
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
  console.log("logout");
  return {
    type: 'logout'
  }
}
