import {
    USER_TRADE_NEW,
    USER_TRADE_NEW_ERROR,
    USER_TRADE_NEW_LOADING,
    USER_TRADES_FETCH,
    USER_TRADES_ERROR,
    USER_TRADES_FETCH_LOADING,
    USER_TRADE_CHANGE_STATUS,
    USER_TRADE_LOADING,
    USER_TRADE_CANCEL
} from "../types";
import { authCall, errorGen } from "../../authCalls";

export const userTradeLoading = (tradeId, action) => {
    return { type:USER_TRADE_LOADING, payload:{tradeId, action } }
}

export const userTradesError = (error) => {
    return { type: USER_TRADES_ERROR, payload: error }
}

export const userNewTrade = (bookId) => {
    if(!bookId)
        return;
    return dispatch => {
        dispatch(userNewTradeLoading(true));
        authCall.post("/api/user/addTrade", { bookId: bookId })
            .then(response => {
                dispatch(userNewTradeSuccess("Trade request sent successfully!"));
                dispatch(userNewTradeError(null));
                dispatch(userNewTradeLoading(false));
            })
            .catch(error => {
                dispatch(userNewTradeLoading(false));
                let errorMessage = errorGen(error);
                dispatch(userNewTradeError(errorMessage));
            });
    }
}

export const userNewTradeLoading = (bool) => {
    return { type: USER_TRADE_NEW_LOADING, payload: bool }
}

export const userNewTradeError = (error) => {
    return { type: USER_TRADE_NEW_ERROR, payload: error }
}

export const userNewTradeSuccess = (message) => {
    return { type: USER_TRADE_NEW, payload: message }
}

export const userFetchTrades = () => {
    return dispatch => {
        dispatch(userFetchTradesLoading(true));
        authCall.get("/api/user/trades")
            .then(response => {
                dispatch(userFetchTradesSuccess(response.data.trades));
                dispatch(userTradesError(null));
                dispatch(userFetchTradesLoading(false));
            })
            .catch(error => {
                dispatch(userFetchTradesLoading(false));
                let errorMessage = errorGen(error);
                dispatch(userTradesError(errorMessage));
            });
    }
}

export const userFetchTradesLoading = (bool) => {
    return { type: USER_TRADES_FETCH_LOADING, payload: bool }
}


export const userFetchTradesSuccess = (data) => {
    return { type: USER_TRADES_FETCH, payload: data }
}


export const userChangeTradeStatus = (tradeId, status) => {
    if(!tradeId || !status)
        return;
    return (dispatch) => {
        dispatch(userTradeLoading(tradeId, "add"));
        authCall.post("/api/user/tradeChangeState", { tradeId: tradeId, status: status })
            .then(response => {
                dispatch(userTradesError(null));
                dispatch(userTradeLoading(tradeId, "remove"));
                dispatch(userChangeTradeStatusSuccess(response.data.trade._id, response.data.trade.status));
            })
            .catch(error => {
                dispatch(userTradeLoading(tradeId, "remove"));
                let errorMessage = errorGen(error);
                dispatch(userTradesError(errorMessage));
            });
    }
}

export const userChangeTradeStatusSuccess = (tradeId, status) => {
    return { type: USER_TRADE_CHANGE_STATUS, payload:{ tradeId, status } }
}

export const userCancelTrade = (tradeId) => {
    if(!tradeId)
        return;
    return dispatch => {
        dispatch(userTradeLoading(tradeId, "add"));
        authCall.post("/api/user/deleteTrade", { tradeId })
            .then(response => {
                dispatch(userTradeLoading(tradeId, "remove"));
                dispatch(userTradesError(null));
                dispatch(userCancelTradeSuccess(response.data.tradeId));
            })
            .catch(error => {
                dispatch(userTradeLoading(tradeId, "remove"));
                let errorMessage = errorGen(error);
                dispatch(userTradesError(errorMessage));
            });
    }
}

export const userCancelTradeSuccess = (tradeId) => {
    return { type: USER_TRADE_CANCEL, payload: tradeId }
}