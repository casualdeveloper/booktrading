import React, { Component } from "react";
import { Button, Form, Grid, Segment, Icon, Header, Message } from "semantic-ui-react"
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userSignup } from "../actions";

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            email:""
        }

        this.signup = this.signup.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    signup(e) {
        e.preventDefault();
        this.props.userSignup(this.state);
  }

    render(){
        if(this.props.user.isAuth){
            return (
                <Redirect to="/" />
            );
        }

        return(
            <div>
            <Grid centered verticalAlign="middle" relaxed>
                    <Grid.Column mobile={16} computer={8} tablet={10}>
                        <Header as="h2" color="teal">Create a new account</Header>
                        <Segment stacked>
                            <Form onSubmit={this.signup} loading={(this.props.loading)?true:false} error={this.props.error?true:false}>
                                <Message
                                    error
                                    header="Failed Signup attempt"
                                    content={this.props.error}
                                />
                                <Form.Input name="email" icon="mail" iconPosition="left" type="text" placeholder="E-mail address" onChange={this.handleInputChange} />
                                <Form.Input name="username" icon="user" iconPosition="left" type="text" placeholder="Username" onChange={this.handleInputChange} />
                                <Form.Input name="password" icon="lock" iconPosition="left" type="password" placeholder="Password" onChange={this.handleInputChange} />
                                <Form.Button color="teal" fluid>Submit</Form.Button>
                            </Form>
                        </Segment>
                        <Message>
                            Already have an account
                            <Link to="/login"> Log in</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        loading: state.user.signupLoading,
        error: state.user.signupError
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({userSignup: userSignup}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup);