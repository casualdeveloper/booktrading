import { setAuthCall } from "../authCalls";

export const setUserData = (data) => {
    window.localStorage.setItem("JWT",data.token);
    setAuthCall(data.token);
}

export const removeUserData = () => {
    window.localStorage.removeItem("JWT");
}

export const getJWT = () => {
    return window.localStorage.getItem("JWT");
}

export const setJWT = (token) => {
    window.localStorage.setItem("JWT",token);
    setAuthCall(token);
}
