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

export function userFetchTrades(state, action){
    return {
        ...state,
        trades: action.payload
    }
}

export function userFetchTradesError(state, action){
    return {
        ...state,
        tradesError: action.payload
    }
}

export function userFetchTradesLoading(state, action){
    return {
        ...state,
        tradesFetchLoading: action.payload
    }
}

export function userChangeTradeStatus(state, action){
    let trades = state.trades.splice(0);
    let tradeIndex = trades.findIndex(obj => obj._id === action.payload.tradeId);
    if(tradeIndex !== -1)
        trades[tradeIndex].status = action.payload.status;

    return {
        ...state,
        trades
    }
}

export function userTradeLoading(state, action){
    let loading = state.changeTradeStatusLoading || [];
    loading = loading.splice(0);

    let tradeId = action.payload.tradeId;
    let loadingAction = action.payload.action;

    if(loadingAction === "add"){
        loading.push(action.payload.tradeId);
    }
    if(loadingAction === "remove"){
        let indexInArray = loading.indexOf(tradeId)
        if(indexInArray !== -1){
            loading.splice(indexInArray, 1);
        }
    }
    
    return {
        ...state,
        tradeLoading: loading
    }
}


export function userTradeCancel(state, action){
    let trades = state.trades.splice(0);
    
    let indexInArray = trades.findIndex(obj => obj._id === action.payload);
    if(indexInArray !== -1){
        trades.splice(indexInArray,1);
    }

    return {
        ...state,
        trades
    }
    
}