import { USER_ADD_BOOK, USER_FETCH_BOOKS, USER_FETCH_BOOKS_ERROR, USER_FETCH_BOOKS_LOADING } from "../types";
import axios from "axios";
import * as localData from "../../localData/userLocalData";
import { authCall } from "../../authCalls";

export const userAddBook = (bookId) => {
    return { type: USER_ADD_BOOK, payload: bookId }
}

export const userFetchBooks = () => {
    return dispatch => {
        dispatch(userFetchBooksLoading(true));
        authCall.get("/api/user/fetchbooks")
            .then(response => {
                dispatch(userFetchBooksLoading(false));
                dispatch(userFetchBooksError(null));
                dispatch(userFetchBooksSuccess(response.data.books));
                console.log(response);
            })
            .catch(error => {
                dispatch(userFetchBooksLoading(false));
                let errorMessage = (error.response && error.response.data && error.response.data.error)?error.response.data.error:"Failed to fetch users books.";
                dispatch(userFetchBooksError(errorMessage));
                console.log(error.response);
            });
    }
}

export const userFetchBooksLoading = (bool) => {
    return { type: USER_FETCH_BOOKS_LOADING, payload: bool }
}

export const userFetchBooksError = (error) => {
    return { type: USER_FETCH_BOOKS_ERROR, payload: error }
}

export const userFetchBooksSuccess = (data) => {
    return { type: USER_FETCH_BOOKS, payload: data }
}