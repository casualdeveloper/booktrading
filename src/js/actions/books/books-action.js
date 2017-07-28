import {
    BOOK_SEARCH,
    BOOK_SEARCH_ERROR,
    BOOK_SEARCH_LOADING,
    BOOK_SEARCH_SUCCESS,
    BOOK_ADD_BOOK,
    BOOK_ADD_BOOK_LOADING,
    BOOK_ADD_BOOK_ERROR
} from "../types";

import axios from "axios";
import {authPost, userAddBook} from "../user";
import * as localData from "../../localData/userLocalData";

export const searchBooks = (search) => {
    return (dispatch) => {
        dispatch(searchBooksLoading(true));
        dispatch({ type: BOOK_SEARCH, payload: search.search });
        authPost.post("/api/books/search", search)
            .then(response => {
                dispatch(searchBooksLoading(false));
                dispatch(searchBooksSuccess(response.data));
            })
            .catch(error => {
                dispatch(searchBooksLoading(false));
                dispatch(searchBooksError(error.response.data.error));
            });
        
    }
}

export const searchBooksLoading = (bool) => {
    return { type: BOOK_SEARCH_LOADING, payload: bool }
}

export const searchBooksSuccess = (data) => {
    return { type: BOOK_SEARCH_SUCCESS, payload: data }
}

export const searchBooksError = (data) => {
    return { type: BOOK_SEARCH_ERROR, payload: data }
}

export const addBook = (book) => {
    return (dispatch) => {
        dispatch(addBookLoading(true));
        authPost.post("/api/books/addBook", {book: book})
            .then(response => {
                dispatch(addBookLoading(false));
                dispatch(addBookSuccess(response.data.book));
                dispatch(userAddBook(response.data.book._id));
            })
            .catch(error => {
                dispatch(addBookLoading(false));
                let defaultError = "Failed to add book";
                let errorMessage = (error.response && error.response.data && error.response.data.error )?error.response.data.error:defaultError;
                dispatch(addBookError(errorMessage));
            });
        
    }    
}

export const addBookSuccess = (book) => {
    return { type: BOOK_ADD_BOOK, payload: book }
}

export const addBookError = (error) => {
    return { type: BOOK_ADD_BOOK_ERROR, payload: error }
}

export const addBookLoading = (bool) => {
    return { type: BOOK_ADD_BOOK_LOADING, payload: bool }
}