import * as localData from "./localData/userLocalData";
import axios from "axios";

export const setAuthCall = (token) => {
    authCall.defaults.headers.common["Authorization"] = token || localData.getJWT();
}

export const authCall = axios.create({});

export const errorGen = (error=null, defaultMessage = "Something went wrong, please try again later!") => {

    let errorMessage = defaultMessage;
    if(error && error.response && error.response.data && error.response.data.error){
        errorMessage = error.response.data.error;
    }

    return errorMessage;
}