import { USER_LOGIN,USER_LOGOUT, USER_LOGIN_ERROR, USER_LOGIN_LOADING, USER_SIGNUP_ERROR, USER_SIGNUP_LOADING, USER_FETCHING_DATA } from "./types";
import axios from "axios";

const setUserData = (data) => {
    window.localStorage.setItem("JWT",data.token);
    window.localStorage.setItem("user",JSON.stringify(data.user));
}

const removeUserData = () => {
    window.localStorage.removeItem("JWT");
    window.localStorage.removeItem("user");
}

const getJWT = () => {
    return window.localStorage.getItem("JWT");
}

const getUser = () => {
    return JSON.parse(window.localStorage.getItem("user"));
}

const setJWT = (token) => {
    window.localStorage.setItem("JWT",token);
}

const setUser = (user) => {
    window.localStorage.setItem("user",JSON.stringify(user));
}

export const userLogin = (user) => {
    return (dispatch) => {
        dispatch(userLoginLoading(true));

        axios.post("/api/auth/login", user)
            .then(response => {
                dispatch(userLoginLoading(false));
                dispatch(userLoginSuccess(response.data.user));
                dispatch(userLoginError(false));
                setUserData(response.data);
            })
            .catch(error => {
                dispatch(userLoginLoading(false));
                dispatch(userLoginError(error.response.data.error));
            });
    }
    
}

export const userLocalLogin = () => {
    const JWT = getJWT();
    const user = getUser();
    
    return (dispatch) => {
        if(!JWT && !user || user && !JWT){
            return dispatch(userLogout());
        }
        if(user){
            return dispatch(userLoginSuccess(user));
        }
        if(JWT){
            dispatch(userFetchingData(true));

            axios.post("/api/auth/extractJWT", {"token":JWT})
                .then(response => {
                    dispatch(userFetchingData(false));
                    dispatch(userLoginSuccess(response.data));
                    setUser(response.data);
                })
                .catch(err => {
                    dispatch(userFetchingData(false));
                    dispatch(userLogout());
                });

        }
        

    }
}

export const userLogout = () => {
    removeUserData();
    return {
        type: USER_LOGOUT
    }
}


export const userLoginSuccess = (data) => {
    return {
        type: USER_LOGIN,
        payload: data
    }
}

export const userLoginError = (error) => {
    return {
        type: USER_LOGIN_ERROR,
        payload: error
    }
}

export const userLoginLoading = (bool) => {
    return {
        type: USER_LOGIN_LOADING,
        payload: bool
    }
}


export const userSignup = (user) => {
    return dispatch => {
        dispatch(userSignupLoading(true));

        axios.post("/api/auth/signup", user)
            .then(response => {
                dispatch(userSignupLoading(false));
                dispatch(userSignupError(null));
                //login user
                dispatch(userLoginSuccess(response.data.user));
                setUserData(response.data);
            })
            .catch(error => {
                dispatch(userSignupLoading(false));
                dispatch(userSignupError(error.response.data.error));
            });
    }
}

export const userSignupLoading = (bool) => {
    return {
        type: USER_SIGNUP_LOADING,
        payload: bool
    }
}

export const userSignupError = (error) => {
    return {
        type: USER_SIGNUP_ERROR,
        payload: error
    }
}

export const userFetchingData = (bool) => {
    return {
        type: USER_FETCHING_DATA,
        payload: bool
    }
}