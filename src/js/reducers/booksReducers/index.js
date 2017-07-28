import {
    BOOK_SEARCH,
    BOOK_SEARCH_ERROR,
    BOOK_SEARCH_LOADING,
    BOOK_SEARCH_SUCCESS,
    BOOK_ADD_BOOK,
    BOOK_ADD_BOOK_LOADING
} from "../../actions/types.js"

import * as books from "./books-reducer";

export function booksReducer(state = {}, action) {
    switch(action.type){
        case BOOK_SEARCH: return ( books.bookSearch(state, action) );
        case BOOK_SEARCH_ERROR: return ( books.bookSearchError(state, action) );
        case BOOK_SEARCH_LOADING: return ( books.bookSearchLoading(state, action) );
        case BOOK_SEARCH_SUCCESS: return ( books.bookSearchSuccess(state, action) );
        case BOOK_ADD_BOOK: return ( books.bookAddBook(state, action) );
        case BOOK_ADD_BOOK_LOADING: return ( books.bookAddBookLoading(state, action) );
        default: return state
    }
}