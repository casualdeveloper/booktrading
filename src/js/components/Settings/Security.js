import React, {Component} from "react";
import { Segment, Form, Message, Divider, Header, Icon} from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changePassword, changePasswordError, changePasswordSuccess } from "../../actions";


class SettingsSecurity extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPassword:"",
            newPassword:"",
            newPassword2:""
        };
        this.defaultState = this.state;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleInputChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    submit(e){
        e.preventDefault();

        const {currentPassword,newPassword,newPassword2} = this.state;

        if(newPassword === newPassword2){
            return this.props.changePassword({currentPassword, newPassword});
        }
        
        return this.props.changePasswordError("Password don't match");
    }

    componentWillUnmount(){
        this.props.changePasswordError(false);
        this.props.changePasswordSuccess(false);
    }

    render(){
        const showError = this.props.error?true:false;
        const showSuccess = this.props.success?true:false;
        const isLoading = this.props.loading?true:false;
        return(
            <Segment>
                <Header size="small">Change password</Header>
                <Form onSubmit={this.submit} loading={isLoading} error={showError} success={showSuccess} >

                    <Message error icon>
                        <Icon name="remove circle outline"/>
                        <Message.Content>
                            <Message.Header>Failed to change password</Message.Header>
                            {this.props.error}
                        </Message.Content>
                    </Message>

                    <Message success icon>
                        <Icon name="check circle outline"/>
                        <Message.Content>
                            <Message.Header>Success</Message.Header>
                            {this.props.success}
                        </Message.Content>
                    </Message>

                    <Form.Input name="currentPassword" type="password" placeholder="Current password" value={this.state.currentPassword} onChange={this.handleInputChange} />
                    <Divider />
                    <Form.Input name="newPassword" type="password" placeholder="New password" value={this.state.newPassword} onChange={this.handleInputChange} />
                    <Form.Input name="newPassword2" type="password" placeholder="Repeat new password" value={this.state.newPassword2} onChange={this.handleInputChange} />
                    <Form.Button color="teal" fluid>Change password</Form.Button>
                </Form>
            </Segment>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        loading: state.user.changePasswordLoading,
        error: state.user.changePasswordError,
        success: state.user.changePasswordSuccess,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({changePassword, changePasswordError, changePasswordSuccess}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(SettingsSecurity);