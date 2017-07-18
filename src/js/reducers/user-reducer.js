import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_LOGIN_ERROR,
    USER_LOGIN_LOADING,
    USER_SIGNUP_ERROR,
    USER_SIGNUP_LOADING,
    USER_FETCHING_DATA,
    USER_PROFILE_UPDATE_ERROR,
    USER_PROFILE_UPDATE_LOADING
} from "../actions/types";

//Login
export function user(state = {}, action) {
    switch (action.type) {
        case USER_LOGIN:
            return { ...action.payload, isAuth: true  };
        case USER_LOGOUT:
            return { isAuth: false };
    }
    return state;
}

export function userLoginLoading(state = false, action) {
    switch (action.type) {
        case USER_LOGIN_LOADING:
            return action.payload;
    }
    return state;
}

export function userLoginError(state = null, action) {
    switch (action.type) {
        case USER_LOGIN_ERROR:
            return action.payload;
    }
    return state;
}

//Signup
export function userSignupLoading(state = false, action) {
    switch (action.type) {
        case USER_SIGNUP_LOADING:
            return action.payload;
    }
    return state;
}

export function userSignupError(state = null, action) {
    switch (action.type) {
        case USER_SIGNUP_ERROR:
            return action.payload;
    }
    return state;
}

//fetching user data from db

export function userFetchingData(state = false, action) {
    switch (action.type) {
        case USER_FETCHING_DATA:
            return action.payload
    }
    return state;
}

// profile update

export function userProfileUpdateLoading(state=false, action){
    switch(action.type){
        case USER_PROFILE_UPDATE_LOADING:
            return action.payload
    }
    return state;
}

export function userProfileUpdateError(state=null, action){
    switch(action.type){
        case USER_PROFILE_UPDATE_ERROR:
            return action.payload
    }
    return state;
}