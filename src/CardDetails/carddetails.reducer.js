const INITIAL_STATE = {
  details: null,
  usersDecks: [],
  currentDeck: 1,
  updateDeck: false,
  message: null
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'fetchDeets') {
    let cardData = action.payload.results[0];
    return Object.assign({}, state, {
      details: cardData,
      message: null
    })
  }
  if (action.type === 'addToDeck') {
    console.log("add to deck");
    return Object.assign({}, state, {
      message: 'Card added'
    })
  }
  if (action.type === 'foundDecks') {
    return Object.assign({}, state, {
      usersDecks: action.payload
    })
  }
  if (action.type === 'foundDeck') {
    return Object.assign({}, state, {
      currentDeck: action.payload.id,
      updateDeck: true
    })
  }
  if (action.type === 'foundCards') {
    return Object.assign({}, state, {
      updateDeck: false
    })
  }
  if (action.type === 'logout') {
    return Object.assign({}, state, {
      details: null,
      usersDecks: [],
      currentDeck: 1,
      updateDeck: false,
      message: null
    })
  }
  if (action.type === 'wrongClass') {
    return Object.assign({}, state, {
      message: "Wrong class"
    })
  }
  if (action.type === 'tooMany') {
    return Object.assign({}, state, {
      message: "Card limit reached"
    })
  }
  return state;
}
