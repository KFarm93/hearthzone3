import React from 'react';
import $ from 'jquery';

export function showNewDeck() {
  return {
    type: 'showNewDeck'
  }
}

export function submitNewDeck(event) {
  event.preventDefault();
  let deck_name = event.target.deck_name.value;
  let user_id = event.target.user_id.value;
  let playerClass = event.target.class.value;
  let data = {
    deckName: deck_name,
    userId: user_id,
    playerClass: playerClass
  }
  return function(dispatch) {
    $.ajax({
      type: "POST",
      url: "http://localhost:4000/createDeck",
      data: JSON.stringify(data),
      contentType: "application/json"
    })
    .then(data => {
      dispatch({
        type: 'newDeck'
      })
    })
    .catch(err => {
      let error = (err && err.responseJSON && err.responseJSON.status_message)
      || 'Something went wrong in submitNewDeck in deck.actions';
      dispatch({
        type: 'error',
        error: error
      });
    });
  };
}

export function fetchDecks(user_id) {
  return function(dispatch) {
    $.ajax({
      type: "GET",
      url: "http://localhost:4000/fetchDecks",
      headers: {
        userId: user_id
      },
      contentType: "application/json"
    })
    .then(data => {
      dispatch({
        type: 'foundDecks',
        payload: data
      })
    })
    .catch(err => {
      let error = (err && err.responseJSON && err.responseJSON.status_message)
      || 'Something went wrong in fetchDecks in deck.actions';
      dispatch({
        type: 'error',
        error: error
      });
    });
  }
}

export function findCards(deck_id) {
  return function(dispatch) {
    $.ajax({
      type: "GET",
      url: "http://localhost:4000/fetchCards",
      headers: {
        deckId: deck_id
      },
      contentType: "application/json"
    })
    .then(data => {
      dispatch({
        type: 'foundCards',
        payload: data
      })
    })
    .catch(err => {
      let error = (err && err.responseJSON && err.responseJSON.status_message)
      || 'Something went wrong in findCards in deck.actions';
      dispatch({
        type: 'error',
        error: error
      });
    });
  }
}

export function changeDeck(event, user_id) {
  let deck_name = event.target.value;
  return function(dispatch) {
    $.ajax({
      type: "GET",
      url: "http://localhost:4000/matchDeck",
      headers: {
        deck_name: deck_name,
        user_id: user_id
      },
      contentType: "application/json"
    })
    .then(data => {
      dispatch({
        type: 'foundDeck',
        payload: data
      })
    })
    .catch(err => {
      let error = (err && err.responseJSON && err.responseJSON.status_message)
      || 'Something went wrong in changeDeck in deck.actions';
      dispatch({
        type: 'error',
        error: error
      });
    });
  }
}

export function initialDeck(user_id) {
  console.log("reached initialDeck in actions");
  console.log("user id is: ", user_id);
  return function(dispatch) {
    $.ajax({
      type: "GET",
      url: "http://localhost:4000/fetchDecks",
      headers: {
        userId: user_id
      },
      contentType: "application/json"
    })
    .then(data => {
      dispatch({
        type: 'foundInitDeck',
        payload: data
      })
    })
    .catch(err => {
      let error = (err && err.responseJSON && err.responseJSON.status_message)
      || 'Something went wrong in initialDeck in deck.actions';
      dispatch({
        type: 'error',
        error: error
      });
    });
  }
}

export function cancelDeck() {
  return {
    type: "cancel"
  }
}
