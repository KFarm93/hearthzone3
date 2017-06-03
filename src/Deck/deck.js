import React, { Component } from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';
import * as DeckReducer from './deck.reducer';
import * as actions from './deck.actions';

class Deck extends Component {
  componentDidMount() {
    let user = this.props.login.user;
    console.log(this.props.login.user);
    if (this.props.deck.init === true) {
      console.log("still true")
      this.props.initialDeck(this.props.login.user.id);
    }
  }
  componentWillReceiveProps(newProps) {
    if (this.props.login.user !== newProps.login.user) {
      let user = newProps.login.user;
      this.props.fetchDecks(user.id);
    }
  }
  render() {
    let user = this.props.login.user;
    let header = user.username + "'s Decks";
    let newDeck;
    let existingDecks = null;
    let cardsInDeck = null;
    if (this.props.deck.showNewDeck === true) {
      newDeck = (
        <div id="newDeck">
          <input type="text" placeholder="Deck Name" name="deck_name" id="deckName"/>
          <input type="hidden" name="user_id" value={user.id}/>
          <select name="class" id="classPicker">
            <option>Druid</option>
            <option>Hunter</option>
            <option>Mage</option>
            <option>Paladin</option>
            <option>Priest</option>
            <option>Rogue</option>
            <option>Shaman</option>
            <option>Warlock</option>
            <option>Warrior</option>
          </select>
          <button type="submit" onClick={() => this.props.fetchDecks(user.id)} className="btn btn-info" id="submitDeckBtn">Submit</button>
          <button className="btn btn-danger"  id="cancelDeckBtn" onClick={() => this.props.cancelDeck()}>Cancel</button>
          <br/>
        </div>
      )
    }
    if (this.props.deck.usersDecks !== null && existingDecks === null) {
      existingDecks = (
        this.props.deck.usersDecks.map(result =>
          <option key={result.id} name={result.id}>{result.name}</option>
        )
      )
    }
    if (this.props.deck.cardsInDeck === null && this.props.deck.currentDeck !== null) {
      console.log("better find some cards from: ", this.props.deck.currentDeck);
      this.props.findCards(this.props.deck.currentDeck);
    }
    if (this.props.deck.cardsInDeck !== null) {
      cardsInDeck = (
        this.props.deck.cardsInDeck.map(result =>
          <Link key={result.id} to={"/signed-in/cardDetails/"+result.api_id}><img className="smallCardImg" src={result.img}/></Link>)
      )
    }
    if (this.props.deck.updateDeck === true) {
      existingDecks = null;
      this.props.fetchDecks(user.id);
      if (this.props.deck.currentDeck !== null) {
        this.props.findCards(this.props.deck.currentDeck);
      }
      else {
        console.log("stop update deck deck.js")
        this.props.stopUpdateDeck();
      }
    }

    if (this.props.deck.cardsInDeck) {
      console.log(this.props.deck.cardsInDeck);
    }
    return (
      <div id="deckDiv">
        <h1>{header}</h1>
        <div id="innerDeckDiv">
          <div id="innerDeckDivLeft">
          <button id="createDeckButton" className="btn btn-success" onClick={() => this.props.showNewDeck()}>Create New Deck</button>
            <form onSubmit={event => this.props.submitNewDeck(event)}>
              {newDeck}
              <select id="deckDeckDropdown" onChange={(event) => this.props.changeDeck(event, user.id)} value={this.props.deck.currentDeckName}>
              {existingDecks}
              </select>
            </form>
          </div>
          <div id="innerDeckDivRight">
            {cardsInDeck}
          </div>
        </div>
      </div>
    )
  }
}

const DeckContainer = ReactRedux.connect(
  state => state,
  actions
)(Deck);

export default DeckContainer;
