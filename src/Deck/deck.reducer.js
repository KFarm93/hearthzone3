const INITIAL_STATE = {
  showNewDeck: false,
  usersDecks: null,
  cardsInDeck: [],
  currentDeck: null,
  updateDeck: false,
  currentDeckName: null,
  currentDeckClass: null,
  init: true,
  delete: false,
  cardsToDelete: []
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
  if (action.type === 'fetchDetails') {
    return Object.assign({}, state, {
      updateDeck: true,
      delete: false
    })
  }
  if (action.type === 'logout') {
    return Object.assign({}, state, {
      showNewDeck: false,
      usersDecks: null,
      cardsInDeck: [],
      currentDeck: null,
      updateDeck: false,
      currentDeckName: null,
      init: true,
      delete: false,
      cardsToDelete: []
    })
  }
  if (action.type === 'foundInitDeck') {
    if (action.payload[0] === undefined) {
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
  if (action.type === 'stopUpdateDeck') {
    return Object.assign({}, state, {
      updateDeck: false
    })
  }
  if (action.type === 'getFirstDeck') {
    console.log(action.payload);
    return Object.assign({}, state, {
      currentDeck: action.payload[0].id,
      currentDeckName: action.payload[0].name,
      currentDeckClass: action.payload[0].class
    })
  }
  if (action.type === 'deleteCards') {
    if (action.payload === false) {
      return Object.assign({}, state, {
        delete: true
      })
    }
    else {
      return Object.assign({}, state, {
        delete: false
      })
    }
  }
  if (action.type === 'prepForDelete') {
    return Object.assign({}, state, {
      cardsToDelete: action.toDelete.concat(action.target)
    })
  }
  if (action.type === 'cancelDelete') {
    return Object.assign({}, state, {
      cardsToDelete: action.toDelete
    })
  }
  if (action.type === 'cancelDeleteCards') {
    return Object.assign({}, state, {
      cardsToDelete: action.payload,
      delete: false
    })
  }
  return state;
}
