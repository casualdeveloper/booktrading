import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import App from "./router";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import reducers from "./reducers";
import ReduxThunk  from "redux-thunk";
import { loginFlowMiddleware } from "./middleware/loginFlow";
import "../styles/style.scss";

const store = createStore(reducers,applyMiddleware(ReduxThunk, loginFlowMiddleware));

ReactDOM.render(
    <Provider store={store}>
    <Router>
        <App/>
    </Router>
</Provider>, document.getElementById("root"));