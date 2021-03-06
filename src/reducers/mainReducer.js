

const reducer = (state = {searchResults: [],searching:false,showFollows: false} , action) => {
    switch (action.type) {
        case 'SEARCHING': return {...state, searching:action.bool};
        case 'ADD_RESULTS': return {...state, searchResults:action.res};
        case 'NO_OF_RES': return {...state, noOfResults:action.no};
        case 'SEARCH_FAIL': return {...state, searchResults:[]}
        case 'LATEST_QUERY': return {...state, latestQuery:action.query}
        case 'TOGGLE_FOLLOWS': return {...state, showFollows:!state.showFollows}
        case 'ADD_USER_INFO': return {...state, userInfo:action.info}
        case 'ADD_FOLLOWERS': return {...state, followers:action.info}
        case 'ADD_FOLLOWING': return {...state, following:action.info}
        case 'ADD_REPOS': return {...state, repos:action.info}
        default: return state
    }
}

export default reducer