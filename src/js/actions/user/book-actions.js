import {
    USER_ADD_BOOK,
    USER_ADD_BOOK_ERROR,
    USER_ADD_BOOK_LOADING,
    USER_BOOK_DELETE,
    USER_BOOK_DELETE_ERROR,
    USER_BOOK_DELETE_LOADING,
    USER_FETCH_BOOKS,
    USER_FETCH_BOOKS_ERROR,
    USER_FETCH_BOOKS_LOADING
} from "../types";
import axios from "axios";
import * as localData from "../../localData/userLocalData";
import { authCall, errorGen } from "../../authCalls";

export const addBook = (book) => {
    return (dispatch) => {
        dispatch(userAddBookLoading(true));
        authCall.post("/api/books/addBook", {book: book})
            .then(response => {
                dispatch(userAddBookLoading(false));
                dispatch(userAddBookError(null));
                dispatch(userAddBook(response.data.book._id));
            })
            .catch(error => {
                dispatch(userAddBookLoading(false));
                let defaultError = "Failed to add book";
                let errorMessage = errorGen(error, defaultError);
                dispatch(userAddBookError(errorMessage));
            });
        
    }    
}

export const userAddBookError = (error) => {
    return { type: USER_ADD_BOOK_ERROR, payload: error }
}

export const userAddBookLoading = (bool) => {
    return { type: USER_ADD_BOOK_LOADING, payload: bool }
}

export const userAddBook = (bookId) => {
    return { type: USER_ADD_BOOK, payload: bookId }
}

export const userDeleteBook = (bookId) => {
    if(!bookId)
        return;
    return dispatch => {
        dispatch(userDeleteBookLoading(true));
        authCall.post("/api/books/deleteBook", {bookId: bookId})
            .then(response => {
                dispatch(userDeleteBookLoading(false));
                dispatch(userDeleteBookError(null));
                dispatch(userDeleteBookSuccess(response.data.bookId));
            })
            .catch(error => {
                let errorMessage = errorGen(error);
                dispatch(userDeleteBookLoading(false));
                dispatch(userDeleteBookError(errorMessage));
            });
    }
}

export const userDeleteBookError = (error) => {
    return { type: USER_BOOK_DELETE_ERROR, payload: error }
}

export const userDeleteBookLoading = (bool) => {
    return { type: USER_BOOK_DELETE_LOADING, payload: bool }
}

export const userDeleteBookSuccess = (bookId) => {
    return { type: USER_BOOK_DELETE, payload: bookId }
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
                dispatch(userFetchBooksLoading(false));
                let errorMessage = errorGen(error, "Failed to fetch users books.")
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