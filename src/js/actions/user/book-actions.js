import { USER_ADD_BOOK, USER_FETCH_BOOKS, USER_FETCH_BOOKS_ERROR, USER_FETCH_BOOKS_LOADING } from "../types";
import axios from "axios";
import * as localData from "../../localData/userLocalData";
import { authCall } from "../../authCalls";

export const userAddBook = (bookId) => {
    return { type: USER_ADD_BOOK, payload: bookId }
}

export const userFetchBooks = (lastBook) => {
    return dispatch => {
        dispatch(userFetchBooksLoading(true));
        if(!lastBook)
            lastBook = null;
        authCall.post("/api/user/fetchbooks", { lastBook: lastBook })
            .then(response => {
                let books = response.data.books;
                if(books.length > 0)
                    lastBook = books[books.length - 1]._id;
                dispatch(userFetchBooksLoading(false));
                dispatch(userFetchBooksError(null));
                dispatch(userFetchBooksSuccess(response.data.books, lastBook));
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                dispatch(userFetchBooksLoading(false));
                let errorMessage = (error.response && error.response.data && error.response.data.error)?error.response.data.error:"Failed to fetch users books.";
                dispatch(userFetchBooksError(errorMessage));
            });
    }
}

export const userFetchBooksLoading = (bool) => {
    return { type: USER_FETCH_BOOKS_LOADING, payload: bool }
}

export const userFetchBooksError = (error) => {
    return { type: USER_FETCH_BOOKS_ERROR, payload: error }
}

export const userFetchBooksSuccess = (data, lastBook) => {
    return { type: USER_FETCH_BOOKS, payload: data, lastBook }
}