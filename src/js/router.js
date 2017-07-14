import React from "react";
import { Route, Link, withRouter  } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { userLogout } from "./actions";

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const pathname = this.context.router.history.location.pathname;
        
        const userExists = !!(this.props.user._id);

        const LoginSubmenu = (
            <Menu.Menu position="right">
                <Menu.Item as={Link} to="/login" content="Login" active={pathname === "/login"} />
                <Menu.Item as={Link} to="/signup" content="Signup" active={pathname === "/signup"}   />
            </Menu.Menu>
        );

        const UserProfileSubmenu = (
            <Menu.Menu position="right">
                <Menu.Item content="Logout" onClick={()=>{this.props.userLogout()}} />
            </Menu.Menu>
        );


        return(
                <Container>
                    <Menu text color="teal" size="massive" fluid>
                        <Menu.Item as={Link} to="/" content="Home" active={pathname === "/"} />
                        {userExists?UserProfileSubmenu:LoginSubmenu}
                    </Menu>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login} />
                    <Route path ="/signup" component={Signup} />
                    
                </Container>
        );
   }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({userLogout: userLogout}, dispatch);
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));