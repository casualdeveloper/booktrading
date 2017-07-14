import { USER_LOGIN,USER_LOGOUT, USER_LOGIN_ERROR, USER_LOGIN_LOADING, USER_SIGNUP_ERROR, USER_SIGNUP_LOADING } from "./types";
import axios from "axios";

const setUserData = (data) => {
    window.localStorage.setItem("JWT",data.token);
}

const removeUserData = () => {
    window.localStorage.removeItem("JWT");
}

export const userLogin = (user) => {
    return (dispatch) => {
        dispatch(userLoginLoading(true));

        axios.post("/api/auth/login", user)
            .then(response => {
                dispatch(userLoginLoading(false));
                dispatch(userLoginSuccess(response.data));
                dispatch(userLoginError(false));
                setUserData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                dispatch(userLoginLoading(false));
                dispatch(userLoginError(error.response.data.error));
                console.log(error.response.data)
            });
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
                dispatch(userLoginSuccess(response.data));
                setUserData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                dispatch(userSignupLoading(false));
                dispatch(userSignupError(error.response.data.error));
                console.log(error.response.data)
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