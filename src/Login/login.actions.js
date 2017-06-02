import $ from 'jquery';

let BASEURL = 'http://localhost:4000/api';
if (window.location.hostname !== 'localhost') {
  BASEURL = '/api';
}

export function submitLogin(event) {
  event.preventDefault();
  let u = event.target.username.value;
  let p = event.target.password.value;
  let data = {
    username: u,
    password: p
  }
  return function(dispatch) {
    $.ajax({
      type: "POST",
      url: `${BASEURL}/login`,
      data: JSON.stringify(data),
      contentType: "application/json"
    })
    .then(data => {
      dispatch({
        type: 'login',
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
  };
}
