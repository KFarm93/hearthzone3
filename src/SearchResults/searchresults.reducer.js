const INITIAL_STATE = {
  searchResults: null,
  searchTerm: null
};

export default function reducer(state = INITIAL_STATE, action) {
  if (action.type === 'search') {
    for (let i=0;i<action.payload.results.length;i++) {
      if (action.payload.results[i].img == undefined) {
        action.payload.results[i].img = "http://media-hearth.cursecdn.com/attachments/39/664/cardback_0.png";
      }
    }
    return Object.assign({}, state, {
      searchResults: action.payload,
      searchTerm: action.term
    })
  }
  if (action.type === 'logout') {
    return Object.assign({}, state, {
      searchResults: null
    })
  }
  if (action.type === 'fetchDeets') {
    return Object.assign({}, state, {
      searchResults: null
    })
  }
  return state;
}
