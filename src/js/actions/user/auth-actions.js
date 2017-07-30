import {
    USER_LOGIN,
    USER_LOGOUT,
    USER_LOGIN_ERROR,
    USER_LOGIN_LOADING,
    USER_SIGNUP_ERROR,
    USER_SIGNUP_LOADING,
    USER_FETCHING_DATA
} from "../types";
import * as localData from "../../localData/userLocalData";
import {authCall, setAuthCall} from "../../authCalls";

export const userLogin = (user) => {
    return (dispatch) => {
        dispatch(userLoginLoading(true));

        authCall
            .post("/api/auth/login", user)
            .then(response => {
                dispatch(userLoginSuccess(response.data.user));
                localData.setJWT(response.data.token);
            })
            .catch(error => {
                let errorMessage = error.response.data.error || "Something went wrong please try again later";
                dispatch(userLoginError(errorMessage));
            });
    }

}

//to login user after website reload...
export const userLocalLogin = () => {
    const JWT = localData.getJWT();

    return (dispatch) => {
        if (!JWT || JWT === "undefined") {
            dispatch(userFetchingData(false));
            return dispatch(userLogout());
        }
        if (JWT) {
            setAuthCall(JWT);
            authCall
                .post("/api/auth/extractJWT")
                .then(response => {
                    dispatch(userLoginSuccess(response.data.user));
                    dispatch(userFetchingData(false));
                })
                .catch(err => {
                    dispatch(userFetchingData(false));
                    dispatch(userLogout());
                });
        }
    }
}

export const userLogout = () => {
    localData.removeUserData();
    return {type: USER_LOGOUT}
}

export const userLoginSuccess = (data) => {
    return {type: USER_LOGIN, payload: data}
}

export const userLoginError = (error) => {
    return {type: USER_LOGIN_ERROR, payload: error}
}

export const userLoginLoading = (bool) => {
    return {type: USER_LOGIN_LOADING, payload: bool}
}

export const userSignup = (user) => {
    return dispatch => {
        dispatch(userSignupLoading(true));

        authCall
            .post("/api/auth/signup", user)
            .then(response => {
                dispatch(userSignupLoading(false));
                dispatch(userSignupError(null));
                //login user
                dispatch(userLoginSuccess(response.data.user));
                localData.setJWT(response.data.token);
            })
            .catch(error => {
                dispatch(userSignupLoading(false));
                let errorMessage = error.response.data.error || "Something went wrong please try again later";
                dispatch(userSignupError(errorMessage));
            });
    }
}

export const userSignupLoading = (bool) => {
    return {type: USER_SIGNUP_LOADING, payload: bool}
}

export const userSignupError = (error) => {
    return {type: USER_SIGNUP_ERROR, payload: error}
}

export const userFetchingData = (bool) => {
    return {type: USER_FETCHING_DATA, payload: bool}
}