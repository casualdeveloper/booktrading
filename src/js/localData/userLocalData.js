import { setAuthPost } from "../actions";

export const setUserData = (data) => {
    window.localStorage.setItem("JWT",data.token);
    window.localStorage.setItem("user",JSON.stringify(data.user));
    setAuthPost(data.token);
}

export const removeUserData = () => {
    window.localStorage.removeItem("JWT");
    window.localStorage.removeItem("user");
}

export const getJWT = () => {
    return window.localStorage.getItem("JWT");
}

export const getUser = () => {
    let json;
    try {
        json = JSON.parse(window.localStorage.getItem("user"));
    } catch (e){
        json = null;
    }
    return null;
}

export const setJWT = (token) => {
    window.localStorage.setItem("JWT",token);
    setAuthPost(token);
}

export const setUser = (user) => {
    window.localStorage.setItem("user",JSON.stringify(user));
}