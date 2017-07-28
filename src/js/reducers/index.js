import {combineReducers} from "redux";
import {userReducer } from "./userReducers";
import {booksReducer} from "./booksReducers";

const reducers = combineReducers({
    user: userReducer,
    books: booksReducer
});

export default reducers;