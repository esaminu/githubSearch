

const reducer = (state = {searchResults: [],searching:false,showFollows: false} , action) => {
    switch (action.type) {
        case 'SEARCHING': return {...state, searching:action.bool};
        case 'ADD_RESULTS': return {...state, searchResults:action.res};
        case 'NO_OF_RES': return {...state, noOfResults:action.no};
        case 'SEARCH_FAIL': return {...state, searchResults:[]}
        case 'LATEST_QUERY': return {...state, latestQuery:action.query}
        case 'TOGGLE_FOLLOWS': return {...state, showFollows:!state.showFollows}
        default: return state
    }
}

export default reducer