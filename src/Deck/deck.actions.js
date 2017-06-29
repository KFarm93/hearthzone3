import React from 'react';
import $ from 'jquery';

let BASEURL = 'http://localhost:4000/api';
if (window.location.hostname !== 'localhost') {
  BASEURL = '/api';
}

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
      url: `${BASEURL}/createDeck`,
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
      url: `${BASEURL}/fetchDecks`,
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
      url: `${BASEURL}/fetchCards`,
      headers: {
        deckId: deck_id
      },
      contentType: "application/json"
    })
    .then(data => {
      if (data !== null) {
        dispatch({
          type: 'foundCards',
          payload: data
        })
      }
      else {
        dispatch({
          type: 'foundCards'
        })
      }
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
      url: `${BASEURL}/matchDeck`,
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
  return function(dispatch) {
    $.ajax({
      type: "GET",
      url: `${BASEURL}/fetchDecks`,
      headers: {
        userId: user_id
      },
      contentType: "application/json"
    })
    .then(data => {
      if (data !== null) {
        dispatch({
          type: 'foundInitDeck',
          payload: data
        })
      }
      else {
        dispatch({
          type: 'foundInitDeck'
        })
      }
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

export function stopUpdateDeck() {
  return {
    type: 'stopUpdateDeck'
  }
}

export function getFirstDeck(existingDecks) {
  return {
    type: 'getFirstDeck',
    payload: existingDecks
  }
}

export function deleteCards(bool) {
  return {
    type: 'deleteCards',
    payload: bool
  }
}

export function prepForDelete(target, toDelete) {
  let arrayTarget = [target];
  return {
    type: 'prepForDelete',
    target: arrayTarget,
    toDelete: toDelete
  }
}

export function cancelDelete(target, toDelete) {
  let newArr = [];
  for (let i=0;i<toDelete.length;i++) {
    if (toDelete[i] === target) {
    }
    else {
      newArr.push(toDelete[i]);
    }
  }
  return {
    type: 'cancelDelete',
    toDelete: newArr
  }
}

export function cancelDeleteCards() {
  return {
    type: 'cancelDeleteCards',
    payload: []
  }
}

export function confirmDelete(cardsToDelete, deck) {
  let data = {
    cardsToDelete: cardsToDelete,
    deck: deck
  }
  return function(dispatch) {
    $.ajax({
      type: "POST",
      url: `${BASEURL}/confirmDelete`,
      data: JSON.stringify(data),
      contentType: "application/json"
    })
    .then(data => {
      dispatch({
        type: 'fetchDetails'
      })
    })
    .catch(err => {
      let error = (err && err.responseJSON && err.responseJSON.status_message)
      || 'Something went wrong in confirmDelete in deck.actions';
      dispatch({
        type: 'error',
        error: error
      });
    });
  };
}
