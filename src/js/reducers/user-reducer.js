import { USER_LOGIN, USER_LOGOUT , USER_LOGIN_ERROR, USER_LOGIN_LOADING, USER_SIGNUP_ERROR, USER_SIGNUP_LOADING, USER_FETCHING_DATA } from "../actions/types";

//Login
export function user(state = {}, action){
    switch(action.type){
        case USER_LOGIN:
            return action.payload;
        case USER_LOGOUT:
            return {};
    }
    return state;
}

export function userLoginLoading(state=false, action){
    switch(action.type){
        case USER_LOGIN_LOADING:
            return action.payload;
    }
    return state;
}

export function userLoginError(state=null, action){
    switch(action.type){
        case USER_LOGIN_ERROR:
            return action.payload;
    }
    return state;
}


//Signup
export function userSignupLoading(state=false, action){
    switch(action.type){
        case USER_SIGNUP_LOADING:
            return action.payload;
    }
    return state;
}

export function userSignupError(state=null, action){
    switch(action.type){
        case USER_SIGNUP_ERROR:
            return action.payload;
    }
    return state;
}

export function userFetchingData(state=false,action){
    switch(action.type){
        case USER_FETCHING_DATA:
            return action.payload
    }
    return state;
}