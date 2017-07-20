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
} from "../../actions/types";

import * as user from "./user-reducer";
import * as auth from "./auth-reducer";

export function userReducer(state = {}, action) {
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
        default: return state;
    }
}