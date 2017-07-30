import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_LOGIN_ERROR,
    USER_LOGIN_LOADING,
    USER_SIGNUP_ERROR,
    USER_SIGNUP_LOADING,
    USER_FETCHING_DATA,
    USER_PROFILE_UPDATE_ERROR,
    USER_PROFILE_UPDATE_LOADING,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_CHANGE_PASSWORD_ERROR,
    USER_CHANGE_PASSWORD_LOADING,
    USER_CHANGE_PASSWORD_SUCCESS,
    USER_ADD_BOOK,
    USER_FETCH_BOOKS,
    USER_FETCH_BOOKS_ERROR,
    USER_FETCH_BOOKS_LOADING
} from "../../actions/types";

import * as user from "./user-reducer";
import * as auth from "./auth-reducer";
import * as userBooks from "./user-books-reducer"

export function userReducer(state = {fetchingData: true}, action) {
    switch(action.type){
        case USER_LOGIN: return ( auth.userLogin(state, action) );
        case USER_LOGOUT: return ( auth.userLogout(state,action) );
        case USER_LOGIN_ERROR: return ( auth.userLoginError(state,action) );
        case USER_LOGIN_LOADING: return ( auth.userLoginLoading(state,action) );
        case USER_SIGNUP_ERROR: return ( auth.userSignupError(state,action) );
        case USER_SIGNUP_LOADING: return ( auth.userSignupLoading(state,action) );
        case USER_FETCHING_DATA: return ( auth.userFetchingData(state,action) );
        case USER_PROFILE_UPDATE_ERROR: return ( user.userProfileUpdateError(state,action) );
        case USER_PROFILE_UPDATE_LOADING: return ( user.userProfileUpdateLoading(state,action) );
        case USER_PROFILE_UPDATE_SUCCESS: return ( user.userProfileUpdateSuccess(state,action) );
        case USER_CHANGE_PASSWORD_ERROR: return ( user.userChangePasswordError(state,action) );
        case USER_CHANGE_PASSWORD_LOADING: return ( user.userChangePasswordLoading(state,action) );
        case USER_CHANGE_PASSWORD_SUCCESS: return ( user.userChangePasswordSuccess(state,action) );
        case USER_ADD_BOOK: return ( userBooks.userAddBook(state,action) );
        case USER_FETCH_BOOKS: return ( userBooks.userFetchBooks(state,action) );
        case USER_FETCH_BOOKS_ERROR: return ( userBooks.userFetchBooksError(state,action) );
        case USER_FETCH_BOOKS_LOADING: return ( userBooks.userFetchBooksLoading(state,action) );
        default: return state;
    }
}