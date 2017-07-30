import * as localData from "./localData/userLocalData";
import axios from "axios";

export const setAuthCall = (token) => {
    authCall.defaults.headers.common["Authorization"] = token || localData.getJWT();
}

export const authCall = axios.create({});
