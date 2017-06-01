import React from 'react';
import $ from 'jquery';

let BASEURL = 'http://localhost:4000';
if (window.location.hostname !== 'localhost') {
  BASEURL = '';
}

export function fetchDeets(cardId) {
  return function(dispatch) {
    $.ajax({
      type: "GET",
      url: `${BASEURL}/cardDetails/`,
      headers: {
        id: cardId
      },
      contentType: "application/json"
    })
    .then(data => {
      dispatch({
        type: 'fetchDeets',
        payload: data
      })
    })
    .catch(err => {
      let error = (err && err.responseJSON && err.responseJSON.status_message)
      || 'Something went wrong in fetchDeets in carddetails.actions';
      dispatch({
        type: 'error',
        error: error
      });
    });
  };
}

export function addToDeck(event, details, deck) {
  event.preventDefault();
  if (details.playerClass !== deck.currentDeckClass && details.playerClass !== 'Neutral' && details.playerClass !== null) {
    console.log("not a match");
    console.log(details.playerClass);
    console.log(deck.currentDeckClass);
    return {
      type: 'wrongClass'
    }
  }
  else {
    console.log("match");
  }
  if (deck.cardsInDeck.length >= 30) {
    console.log("too many cards");
    return {
      type: 'tooMany'
    }
  }
  let data = {
    details: details,
    deck: deck.currentDeck
  }
  return function(dispatch) {
    $.ajax({
      type: "POST",
      url: `${BASEURL}/addToDeck/`,
      data: JSON.stringify(data),
      contentType: "application/json"
    })
    .then(
      dispatch({
        type: 'addToDeck',
        payload: data
      })
    )
    .catch(err => {
      let error = (err && err.responseJSON && err.responseJSON.status_message)
      || 'Something went wrong in addToDeck in carddetails.actions';
      dispatch({
        type: 'error',
        error: error
      });
    });
  };
}
