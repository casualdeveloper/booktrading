export function userProfileUpdateLoading(state, action) {
    return {
        ...state,
        profileUpdateLoading: action.payload
    };
}

export function userProfileUpdateError(state, action) {
    return {
        ...state,
        profileUpdateError: action.payload
    };
}
export function userChangePasswordLoading(state, action){
    return {
        ...state,
        changePasswordLoading: action.payload
    }
}

export function userChangePasswordError(state, action) {
    return {
        ...state,
        changePasswordError: action.payload
    }
}

export function userChangePasswordSuccess(state, action){
    return {
        ...state,
        changePasswordSuccess: action.payload
    }
}