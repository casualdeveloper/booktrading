export function userNewTrade(state, action){
    return {
        ...state,
        newTradeSuccess: action.payload
    }
}

export function userNewTradeLoading(state, action){
    return {
        ...state,
        newTradeLoading: action.payload
    }
}

export function userNewTradeError(state, action){
    return {
        ...state,
        newTradeError: action.payload
    }
}