import { combineReducers } from "redux";
import { user, userLoginError, userLoginLoading, userSignupError, userSignupLoading, userFetchingData, userProfileUpdateLoading, userProfileUpdateError} from "./user-reducer";

const reducers = combineReducers({
    user: user,
    userLoginLoading: userLoginLoading,
    userLoginError: userLoginError,
    userSignupLoading: userSignupLoading,
    userSignupError: userSignupError,
    userFetchingData: userFetchingData,
    userProfileUpdateLoading: userProfileUpdateLoading,
    userProfileUpdateError: userProfileUpdateError
});

export default reducers;