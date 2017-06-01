import React, { Component } from 'react';
import * as ReactRedux from 'react-redux';
import * as SearchResultsReducer from './searchresults.reducer';
import * as actions from './searchresults.actions';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';

class SearchResults extends Component {
  componentDidMount() {
    if (this.props.params.term) {
      this.props.search(this.props.params.term);
    }
  }
  render() {
    let searchResults;
    if (this.props.searchResults !== null) {
      searchResults = (
        this.props.searchResults.results.map(result =>
          <div id="cardDiv" key={result.cardId}>
            <Link to={"signed-in/cardDetails/" + result.cardId}>
              <img src={result.img} className="resultsImg"/>
              <label>{result.name}</label>
            </Link>
          </div>
        )
      )
    }
    return (
      <div>
        <div id="searchResultsDiv">
          {searchResults}
        </div>
      </div>
    );
  }
}

const SearchResultsContainer = ReactRedux.connect(
  state => state.searchresults,
  actions
)(SearchResults);

export default SearchResultsContainer;
