

export const search = (query,page) => dispatch => {
    dispatch({type: 'SEARCHING',bool:true})
    dispatch({type:'ADD_RESULTS',res:[]})
    dispatch({type:'LATEST_QUERY',query})
    return fetch(`https://api.github.com/search/users?q=${query}+in:login&page=${page}`)
            .then(res => res.json())
            .then(res => {
                dispatch({type:'SEARCHING',bool:false})
                dispatch({type:'ADD_RESULTS',res:res.items.map(user => ({
                    login: user.login,
                    avatar_url: user.avatar_url,
                    repos_url: user.repos_url,
                    followers_url: user.followers_url,
                    following_url: user.following_url
                }))})
                dispatch({type:'NO_OF_RES',no:res.total_count})
            })
            .catch(err => {
                dispatch({type:'SEARCHING',bool:false})
                console.error(err);
                dispatch({type:'SEARCH_FAIL'});
            })
}

export const getUserInfo = (user) => dispatch => {
    return fetch(`https://api.github.com/users/${user}`)
            .then(res => res.json())
            .then(info => dispatch({type:'ADD_USER_INFO',info}))
}