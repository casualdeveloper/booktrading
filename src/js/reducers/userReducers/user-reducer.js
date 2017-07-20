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