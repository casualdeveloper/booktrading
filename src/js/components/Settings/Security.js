import React, {Component} from "react";
import { Segment, Form, Message, Divider, Header} from "semantic-ui-react";

class SettingsSecurity extends Component{
    constructor(props){
        super(props);
        this.state = {
            oldPassword:"",
            newPassword:"",
            newPassword2:""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        return(
            <Segment>
                <Header size="small">Change password</Header>
                <Form>
                    <Message
                        error
                        header="Failed to change password"
                        content={this.props.error}
                    />
                    <Form.Input name="oldPassword" type="password" placeholder="Current password" onChange={this.handleInputChange} />
                    <Divider />
                    <Form.Input name="newPassword" type="password" placeholder="New password" onChange={this.handleInputChange} />
                    <Form.Input name="newPassword2" type="password" placeholder="Repeat new password" onChange={this.handleInputChange} />
                    <Form.Button color="teal" fluid>Change password</Form.Button>
                </Form>
            </Segment>
        )
    }
}
 export default SettingsSecurity;