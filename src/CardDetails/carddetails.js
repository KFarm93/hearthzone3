import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';
import * as CardDetailsReducer from './carddetails.reducer';
import * as actions from './carddetails.actions';
import SignedInContainer from '../SignedIn/signedin';
import * as DeckActions from '../Deck/deck.actions';


class CardDetails extends Component {
  componentDidMount() {
    this.props.fetchDeets(this.props.params.cardId);
    this.props.fetchDecks(this.props.login.user.id);
  }
  render() {
    let existingDecks;
    let type;
    let rarity;
    let cardSet;
    let playerClass;
    let message;
    if (this.props.details.message === "Wrong class") {
      message = (
        <span className="redText">ERROR: Card class does not match deck class</span>
      )
    }
    if (this.props.details.message === "Card limit reached") {
      message = (
        <span className="redText">ERROR: Deck card count at maximum</span>
      )
    }
    if (this.props.details.message === "Already two") {
      message = (
        <span className="redText">ERROR: Cannot add more copies of this card</span>
      )
    }
    if (this.props.details.message === "Card added") {
      message = (
        <span className="greenText">SUCCESS: Card added to deck</span>
      )
    }
    if (this.props.details.usersDecks !== null) {
      existingDecks = (
        this.props.details.usersDecks.map(result =>
          <option key={result.id}>{result.name}</option>
        )
      )
    }
    else {
      existingDecks = (
        <option>No Decks Found</option>
      )
    }
    if (this.props.details.details === null) {
      return (
        <div id="cardDetailsDiv">
          <h1>Loading...</h1>
        </div>

      )
    }
    else {
      if (this.props.details.updateDeck === true) {
        this.props.findCards(this.props.deck.currentDeck);
      }
      if (this.props.details.details.type === undefined) {
        type = "**Not Available**";
      }
      else {
        type = this.props.details.details.type;
      }
      if (this.props.details.details.rarity === undefined) {
        rarity = <i>(Not Available)</i>;
      }
      else {
        rarity = this.props.details.details.rarity;
      }
      if (this.props.details.details.cardSet === undefined) {
        cardSet = <i>(Not Available)</i>;
      }
      else {
        cardSet = this.props.details.details.cardSet;
      }
      if (this.props.details.details.playerClass === undefined) {
        playerClass = <i>(Not Available)</i>;
      }
      else {
        playerClass = this.props.details.details.playerClass;
      }
      if (this.props.usersDecks !== null && this.props.deck.currentDeck === null) {
        this.props.getFirstDeck(this.props.deck.usersDecks);
      }
      return (
        <div>
          <div id="cardDetailsDiv">
            <h1>{this.props.details.details.name}</h1>
            <div id="cardImgDiv">
                <img src={this.props.details.details.img} className="cardPic bigger"></img>
                <img src={this.props.details.details.imgGold} className="cardPic bigger" id="goldImg"></img>
            </div>
            <div id="cardInfoDiv">
              <div id="row1">
                <p className="bigger">TYPE:</p>
                <p className="bigger">SET:</p>
                <p className="bigger">RARITY:</p>
                <p className="bigger">PLAYER CLASS:</p>
              </div>
              <div id="row2">
                <p className="bigger">{type}</p>
                <p className="bigger">{cardSet}</p>
                <p className="bigger">{rarity}</p>
                <p className="bigger">{playerClass}</p>
              </div>
            </div>
            <p id="flavor" className="bigger italicize">{this.props.details.details.flavor}</p>
            <div id="addToDeck">
              <form onSubmit={(event) => this.props.addToDeck(event, this.props.details.details, this.props.deck)}>
                <button className="btn btn-success">Add to Deck</button>
                <select id="deckDropdown" name="deckDropdown" className="selectpicker" onChange={(event) => this.props.changeDeck(event, this.props.login.user.id)} value={this.props.deck.currentDeckName}>
                  {existingDecks}
                </select>
              </form>
            </div>
            <h3>{message}</h3>
          </div>
        </div>
      )
    }
  }
}

const CardDetailsContainer = ReactRedux.connect(
  state => state,
  Object.assign({}, actions, DeckActions)
)(CardDetails);

export default CardDetailsContainer;
