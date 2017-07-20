import { USER_LOGIN, USER_LOGIN_ERROR } from "../actions/types";
import { userLoginError, userLoginLoading } from "../actions/auth-actions";

export const loginFlowMiddleware = ({ dispatch }) => next => action => {
    // Let the reducer save the user data
    next(action);

    if (action.type === USER_LOGIN) {
        dispatch(userLoginError(false));
        dispatch(userLoginLoading(false));
    }
    if(action.type === USER_LOGIN_ERROR) {
        dispatch(userLoginLoading(false));
    }
};