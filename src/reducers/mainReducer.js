

const reducer = (state = {searchResults: [],searching:false} , action) => {
    switch (action.type) {
        case 'SEARCHING': return {...state, searching:action.bool};
        case 'ADD_RESULTS': return {...state, searchResults:action.res};
        case 'NO_OF_RES': return {...state, noOfResults:action.no};
        case 'SEARCH_FAIL': return {...state, searchResults:[]}
        case 'LATEST_QUERY': return {...state, latestQuery:action.query}
        default: return state
    }
}

export default reducer