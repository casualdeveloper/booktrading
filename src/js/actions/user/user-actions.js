import {
    USER_PROFILE_UPDATE_ERROR,
    USER_PROFILE_UPDATE_LOADING,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_CHANGE_PASSWORD_ERROR,
    USER_CHANGE_PASSWORD_LOADING,
    USER_CHANGE_PASSWORD_SUCCESS
} from "../types";
import axios from "axios";
import {authPost, userLoginSuccess} from "./auth-actions";
import * as localData from "../../localData/userLocalData";

//update profile
export const updateProfile = (data) => {
    return (dispatch) => {
        dispatch(updateProfileLoading(true));

        authPost
            .post("/api/user/updateProfile", data)
            .then(response => {
                dispatch(updateProfileLoading(false));
                dispatch(updateProfileSuccess("Profile successfully updated."));
                dispatch(userLoginSuccess(response.data.user));
            })
            .catch(error => {
                dispatch(updateProfileLoading(false));
                let errorMessage = error.response.data.error || "Something went wrong please try again later";
                dispatch(updateProfileError(errorMessage));
            });
    }
}

export const updateProfileLoading = (bool) => {
    return {type: USER_PROFILE_UPDATE_LOADING, payload: bool}
}

export const updateProfileError = (error) => {
    return {type: USER_PROFILE_UPDATE_ERROR, paylaod: error}
}

export const updateProfileSuccess = (message) => {
    return {type: USER_PROFILE_UPDATE_SUCCESS, payload: message}
}

//change password
export const changePassword = (data) => {
    const {newPassword, currentPassword} = data;
    return (dispatch) => {
        dispatch(changePasswordLoading(true));
        authPost
            .post("/api/user/changepassword", {newPassword, currentPassword})
            .then(response => {
                dispatch(changePasswordLoading(false));
                dispatch(changePasswordError(false));
                dispatch(changePasswordSuccess(response.data.message));
            })
            .catch(error => {
                dispatch(changePasswordLoading(false));
                dispatch(changePasswordSuccess(false));
                let errorMessage = error.response.data.error || "Something went wrong please try again later";
                dispatch(changePasswordError(errorMessage));
            })
    }
}

export const changePasswordLoading = (bool) => {
    return {type: USER_CHANGE_PASSWORD_LOADING, payload: bool}
}

export const changePasswordError = (error) => {
    return {type: USER_CHANGE_PASSWORD_ERROR, payload: error}
}

export const changePasswordSuccess = (message) => {
    return {type: USER_CHANGE_PASSWORD_SUCCESS, payload: message}
}
