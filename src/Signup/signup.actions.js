import React from 'react';
import $ from 'jquery';

let BASEURL = 'http://localhost:4000/api';
if (window.location.hostname !== 'localhost') {
  BASEURL = '/api';
}

export function submitSignup(form) {
  form.preventDefault();
  let username = form.target.username.value;
  let password1 = form.target.password1.value;
  let password2 = form.target.password2.value;
  let email = form.target.email.value;
  if (password1 === password2) {
    let data = {
      username: username,
      password: password1,
      email: email
    }
    return function(dispatch) {
      $.ajax({
        type: "POST",
        url: `${BASEURL}/signup`,
        data: JSON.stringify(data),
        contentType: "application/json"
      })
      .then(data => {
        if (data.message === 'duplicate username attempted') {
          dispatch({
            type: 'duplicateUsername'
          })
        }
        else {
          dispatch({
            type: 'submitSignup',
            payload: data
          })
        }
      })
      .catch(err => {
        let error = (err && err.responseJSON && err.responseJSON.status_message)
        || 'Something went wrong';
        dispatch({
          type: 'error',
          error: error
        });
      });
    }
  }
  else {
    return {
      type: 'passwordsDontMatch'
    }
  }
}
