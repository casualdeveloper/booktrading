import { USER_NEW_TRADE, USER_NEW_TRADE_ERROR, USER_NEW_TRADE_LOADING } from "../types";
import { authCall } from "../../authCalls";

export const userNewTrade = (bookId) => {
    return dispatch => {
        dispatch(userNewTradeLoading(true));
        authCall.post("/api/user/addTrade", { bookId: bookId })
            .then(response => {
                dispatch(userNewTradeSuccess("Trade request sent successfully!"));
                dispatch(userNewTradeError(null));
                dispatch(userNewTradeLoading(false));
            })
            .catch(error => {
                console.log(error);
                dispatch(userNewTradeLoading(false));
                let errorMessage = (error.response && error.response.data && error.response.data.error)
                    ?error.response.data.error
                    :"Something went wrong, please try again later!";
                dispatch(userNewTradeError(errorMessage));
            });
    }
}

export const userNewTradeLoading = (bool) => {
    return { type: USER_NEW_TRADE_LOADING, payload: bool }
}

export const userNewTradeError = (error) => {
    return { type: USER_NEW_TRADE_ERROR, payload: error }
}

export const userNewTradeSuccess = (message) => {
    return { type: USER_NEW_TRADE, payload: message }
}