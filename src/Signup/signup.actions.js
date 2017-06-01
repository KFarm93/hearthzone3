import React from 'react';
import $ from 'jquery';

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
        url: "http://localhost:4000/signup",
        data: JSON.stringify(data),
        contentType: "application/json"
      })
      .then(data => {
        dispatch({
          type: 'submitSignup',
          payload: data
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
    }
  }
}
