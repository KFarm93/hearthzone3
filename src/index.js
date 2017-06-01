import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { Router, Route, Link, IndexLink, IndexRoute, hashHistory } from 'react-router';
import { persistStore, autoRehydrate } from 'redux-persist';
import Home from './Home/home';
import SignedInContainer from './SignedIn/signedin';
import SignedInReducer from './SignedIn/signedin.reducer';
import LoginContainer from './Login/login';
import LoginReducer from './Login/login.reducer';
import SignupContainer from './Signup/signup';
import SignupReducer from './Signup/signup.reducer';
import CardDetailsContainer from './CardDetails/carddetails';
import CardDetailsReducer from './CardDetails/carddetails.reducer';
import DeckContainer from './Deck/deck';
import DeckReducer from './Deck/deck.reducer';
import SearchResultsContainer from './SearchResults/searchresults';
import SearchResultsReducer from './SearchResults/searchresults.reducer';


const reducer = Redux.combineReducers({
  signedin: SignedInReducer,
  login: LoginReducer,
  signup: SignupReducer,
  searchresults: SearchResultsReducer,
  details: CardDetailsReducer,
  deck: DeckReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.compose(
    Redux.applyMiddleware(ReduxThunk),
    autoRehydrate()
    )
);

persistStore(store);

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Home}>
        <IndexRoute component={LoginContainer}/>
        <Route path="/signup" component={SignupContainer}/>
        <Route path="/signed-in" component={SignedInContainer}>
          <Route path="/signed-in/searchResults/:term" component={SearchResultsContainer}/>
          <Route path="/signed-in/cardDetails/:cardId" component={CardDetailsContainer}/>
          <Route path="/signed-in/deck" component={DeckContainer}/>
        </Route>
      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
