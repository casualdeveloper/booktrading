//Login
export function userLogin(state, action) {
    return {
        ...state,
        ...action.payload,
        isAuth: true
    };
}

export function userLogout(state, action){
    return {
        ...state,
        isAuth: false
    };
}

export function userLoginLoading(state, action) {
    return {
        ...state,
        loginLoading: action.payload
    };
}

export function userLoginError(state, action) {
    return {
        ...state,
        loginError: action.payload
    };
}

//Signup
export function userSignupLoading(state, action) {
    return {
        ...state,
        signupLoading: action.payload
    };
}

export function userSignupError(state, action) {
    return {
        ...state,
        signupError: action.payload
    };
}

//fetching user data from db

export function userFetchingData(state, action) {
    return {
        ...state,
        fetchingData: action.payload
    };
}
