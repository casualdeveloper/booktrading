import React from "react";
import { Route, Link, withRouter, Redirect  } from "react-router-dom";
import { Menu, Container, Dimmer, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Settings from "./components/Settings";

import { userLogout, userLocalLogin } from "./actions";

class App extends React.Component {
    constructor(props){
        super(props);
        this.props.userLocalLogin();
    }

    render(){
        if(this.props.user.fetchingData){
            return(
                <Dimmer active>
                    <Loader>Loading</Loader>
                </Dimmer>
            );
        }
        // examples
        // "/login" -> ["","login"] -> "login"
        // "/settings/security" -> ["","settings","security"] -> "settigns" 
        const pathname = this.props.location.pathname.split("/")[1];
        
        const userExists = this.props.user.isAuth;

        const LoginSubmenu = (
            <Menu.Menu position="right">
                <Menu.Item as={Link} to="/login" content="Login" active={pathname === "login"} />
                <Menu.Item as={Link} to="/signup" content="Signup" active={pathname === "signup"}   />
            </Menu.Menu>
        );

        const UserProfileSubmenu = (
            <Menu.Menu position="right">
                <Menu.Item as={Link} to="/mybooks" content="My Books" active={pathname === "mybooks"} />
                <Menu.Item as={Link} to="/settings" content="Settings" active={pathname === "settings"} />
                <Menu.Item content="Logout" onClick={()=>{this.props.userLogout()}} />
            </Menu.Menu>
        );


        return(
            <Container>
                <Menu text color="teal" size="massive" fluid>
                    <Menu.Item as={Link} to="/" content="Home" active={pathname === ""} />
                    {userExists?UserProfileSubmenu:LoginSubmenu}
                </Menu>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute exact path="/settings" component={Settings} {...this.props} />
                <PrivateRoute path="/settings/:activeTab" component={Settings} {...this.props} />
                   
            </Container>
        );
   }
}


const PrivateRoute = ({component:Component, user:user, ...rest}) => {
    if(user.isAuth){
        return ( 
            <Route {...rest} render={(props) => (
                <Component {...props}/>
            )} /> 
        );
    }

    return (
        <Route {...rest} render={(props) => (
            <Redirect to={{ pathname: "/login", state: { from: props.location }}} />
        )} />
    );
}

function mapStateToProps(state){
    return {
        user: state.user,
        userLoading: state.user.fetchingData
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        userLogout: userLogout,
        userLocalLogin: userLocalLogin
    }, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));