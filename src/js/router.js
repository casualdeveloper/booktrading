import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./Components/Home";
import Login from "./Components/Login";

export default class App extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login} />
                </div>
            </Router>
        );
   }
}