const INITIAL_STATE = {
  showNewDeck: false,
  usersDecks: null,
  cardsInDeck: null,
  currentDeck: null,
  updateDeck: false,
  currentDeckName: null,
  currentDeckClass: null,
  init: true
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'login') {
    return Object.assign({}, state, {
      updateDeck: true
    })
  }
  if (action.type === 'showNewDeck') {
    return Object.assign({}, state, {
      showNewDeck: true
    })
  }
  if (action.type === 'newDeck') {
    return Object.assign({}, state, {
      showNewDeck: false,
      updateDeck: true
    })
  }
  if (action.type === 'foundDecks') {
    return Object.assign({}, state, {
      usersDecks: action.payload
    })
  }
  if (action.type === 'foundCards') {
    if (!action.payload) {
      return Object.assign({}, state, {
        updateDeck: false
      })
    }
    else {
      return Object.assign({}, state, {
        cardsInDeck: action.payload,
        updateDeck: false
      })
    }
  }
  if (action.type === 'foundDeck') {
    return Object.assign({}, state, {
      currentDeck: action.payload.id,
      currentDeckName: action.payload.name,
      updateDeck: true,
      currentDeckClass: action.payload.class
    })
  }
  if (action.type === 'cancel') {
    return Object.assign({}, state, {
      showNewDeck: false
    })
  }
  if (action.type === 'fetchDeets') {
    return Object.assign({}, state, {
      updateDeck: true
    })
  }
  if (action.type === 'logout') {
    return Object.assign({}, state, {
      showNewDeck: false,
      usersDecks: null,
      cardsInDeck: null,
      currentDeck: null,
      updateDeck: false,
      currentDeckName: null,
      init: true
    })
  }
  if (action.type === 'foundInitDeck') {
    console.log("reached foundInitDeck in reducer");
    console.log(action.payload[0]);
    if (action.payload[0] === undefined) {
      console.log("payload was undefined")
      return Object.assign({}, state, {
        init: false,
        updateDeck: false
      })
    }
    else {
      return Object.assign({}, state, {
        currentDeck: action.payload[0].id,
        currentDeckName: action.payload[0].name,
        currentDeckClass: action.payload[0].class,
        usersDecks: action.payload,
        updateDeck: false,
        init: false
      })
    }
  }
  return state;
}
