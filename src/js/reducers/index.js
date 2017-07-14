import { combineReducers } from "redux";
import clickReducer from "./click-reducer";
import { user, userLoginError, userLoginLoading, userSignupError, userSignupLoading} from "./user-reducer";

const reducers = combineReducers({
    clicks: clickReducer,
    user: user,
    userLoginLoading: userLoginLoading,
    userLoginError: userLoginError,
    userSignupLoading: userSignupLoading,
    userSignupError: userSignupError
});

export default reducers;