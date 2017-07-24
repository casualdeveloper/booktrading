import React, { Component } from "react";
import { Button, Form, Grid, Segment, Icon, Header, Message, Label } from "semantic-ui-react"
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userSignup } from "../actions";
import axios from "axios";

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
            email:"",
            emailLoading: false,
            usernameLoading: false,
            errorMessages: []
        }

        this.signup = this.signup.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.CancelToken = axios.CancelToken;
        //this.source = this.CancelToken.source();
        this.cancelUsernameCheck = () => {return; };
        this.cancelEmailCheck = () => {return; };
    }

    handleInputChange(e){
        this.setState({[e.target.name]: e.target.value});

        if(e.target.name === "password") return;
        
        if(e.target.name === "username"){
            this.cancelUsernameCheck();
        }
        if(e.target.name === "email"){
            this.cancelEmailCheck();
        }

        let CancelToken = this.CancelToken

        let axiosConfig = {
            cancelToken: new CancelToken((c) => {
                if(e.target.name === "username"){
                    return this.cancelUsernameCheck = c;
                }
                if(e.target.name === "email"){
                    return this.cancelEmailCheck = c;
                }
            })
        }
        this.setState({[e.target.name+"Loading"]: true});
        axios.post("/api/user/checkformatch", {[e.target.name]: e.target.value }, axiosConfig)
            .then(response => {
                let messages = this.state.errorMessages.slice(0);
                let messageIndex = messages.findIndex((obj) => { return Object.keys(obj).indexOf(e.target.name) !== -1 });
                if(messageIndex !== -1)
                    messages.splice(messageIndex, 1);
                this.setState({ errorMessages: messages , [e.target.name+"Loading"]: false })
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                    return;
                } else {
                    let messages = this.state.errorMessages.slice(0);
                    messages.push({[e.target.name]: error.response.data.error});//example {"password": "error message"}
                    this.setState({ errorMessages: messages, [e.target.name+"Loading"]: false })
                }
            });
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

        const { username, usernameLoading, emailLoading, email, password, errorMessages} = this.state;
        const showInputError = !!(errorMessages.length !== 0);
        const isLoading = (this.props.loading)?true:false;
        const formError = (this.props.error)?true:false;

        return(
            <Grid centered verticalAlign="middle" relaxed>
                <Grid.Column mobile={16} computer={8} tablet={10}>
                    <Header as="h2" color="teal">Create a new account</Header>
                    <Segment stacked>
                        <Form onSubmit={this.signup} loading={isLoading} error={formError}>
                            <Message error > 
                                <Message.Content>
                                    <Message.Header>Failed Signup attempt</Message.Header>
                                    {this.props.error}
                                </Message.Content>
                            </Message>
                            <Form.Input loading={emailLoading} name="email" icon="mail" iconPosition="left" type="text" placeholder="E-mail address" value={email} onChange={this.handleInputChange} />
                            <Form.Input loading={usernameLoading} name="username" icon="user" iconPosition="left" type="text" placeholder="Username" value={username} onChange={this.handleInputChange} />
                            <Form.Input name="password" icon="lock" iconPosition="left" type="password" placeholder="Password" value={password} onChange={this.handleInputChange} />
                            <Message visible = { showInputError } error >
                                <Message.Content>
                                    <Message.Header>Some fields needs fixing</Message.Header>
                                    <Message.List>
                                    {errorMessages.map(obj => {
                                        return <Message.Item>{obj[Object.keys(obj)[0]]}</Message.Item>
                                    })}
                                    </Message.List>
                                </Message.Content>
                            </Message>
                            <Form.Button color="teal" fluid>Submit</Form.Button>
                        </Form>
                    </Segment>
                    <Message>
                        Already have an account
                        <Link to="/login"> Log in</Link>
                    </Message>
                </Grid.Column>
            </Grid>
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