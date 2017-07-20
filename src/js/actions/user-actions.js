import {USER_PROFILE_UPDATE_ERROR, USER_PROFILE_UPDATE_LOADING } from "./types";
import axios from "axios";
import { authPost, userLoginSuccess, setUser } from "./auth-actions";

export const updateProfile = (data) => {
    return (dispatch) => {
        dispatch(updateProfileLoading(true));

        authPost.post("/api/user/updateProfile", data)
            .then(response => {
                dispatch(updateProfileLoading(false));
                dispatch(userLoginSuccess(response.data.user));
                setUser(response.data.user);
            })
            .catch(error => {
                dispatch(updateProfileLoading(false));
                dispatch(updateProfileError(error.response.data.error || "Error"));
            });
    }
}

export const updateProfileLoading = (bool) => {
    return {
        type: USER_PROFILE_UPDATE_LOADING,
        payload: bool
    }
}

export const updateProfileError = (error) => {
    return {
        type: USER_PROFILE_UPDATE_ERROR,
        paylaod: error
    }
}
