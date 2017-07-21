import React, {Component} from "react";
import { Segment, Form, Message, Header} from "semantic-ui-react";
import lists from "../../lists.json";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateProfile, updateProfileError, updateProfileSuccess } from "../../actions";


// load country and state lists
const countryOptions = lists["countries"];
const stateOptions = lists["states"];

class SettingsGeneral extends Component{
    constructor(props){
        super(props);

        this.state = {
            options: [{}],
            optionsLoading: false,
            firstName: this.props.user.firstName || "",
            lastName: this.props.user.lastName || "",
            country:{
                full: this.props.user.country.full || "",
                short: this.props.user.country.short || "",
            }, 
            state: {
                full: this.props.user.state.full || "",
                short: this.props.user.state.short || "",
            },
            city: this.props.user.city || ""
        };

        // upload 1 initial option for dropdown list
        // so user can see previously chosen country
        if(this.state.country.short){
            //find index of object(that matches short value with users current country) in array 
            let initialCountryIndex = countryOptions.findIndex(obj => obj.value === this.state.country.short);
            if(initialCountryIndex !== -1)
                this.state.options[0] = countryOptions[initialCountryIndex];
        }


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownChangeCountry = (e, { value }) => { this.setState({ country: { short: value, full: this.getFullCountryName(value) } }) };
        this.handleDropdownChangeState = (e, { value }) => { this.setState({ state: { short: value, full: this.getFullStateName(value) } }) };
        this.loadOptions = this.loadOptions.bind(this);
        this.submit = this.submit.bind(this);
    }

    // example: "us" -> "United States", "de" -> "Germany"
    getFullCountryName(short){
        let i = countryOptions.findIndex(obj => obj.value === short);
        let obj = "";
        if(i !== -1)
            return countryOptions[i].text;
        return obj;

    }
    // example: "il" -> "Illinois", "ky" -> "Kentucky"
    getFullStateName(short){
        let i = stateOptions.findIndex(obj => obj.value === short);
        let obj = "";
        if(i !== -1)
            return stateOptions[i].text;
        return obj;
    }
    
    handleInputChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    //load options once clicked on country dropdown menu 
    loadOptions(){
        this.setState({ optionsLoading: true }, () => {
            this.setState({ options:countryOptions}, ()=>{
                this.setState({ optionsLoading: false }); 
            });
        });
    }

    submit(e){
        e.preventDefault();

        const {options, optionsLoading, ...data} = this.state;
        this.props.updateProfile(data);

    }

    componentWillUnmount(){
        this.props.updateProfileError(false);
        this.props.updateProfileSuccess(false);
    }

    render(){
        const showError = this.props.error?true:false;
        const showSuccess = this.props.success?true:false;
        const isLoading = this.props.loading?true:false;

        return(
            <Segment>
                <Header size="small">Profile Settings</Header>
                <Form onSubmit={this.submit} loading={isLoading} error={showError} success={showSuccess}>

                    <Message error >
                        <Message.Content>
                            <Message.Header>Failed to update</Message.Header>
                            {this.props.error}
                        </Message.Content>
                    </Message>

                    <Message success >
                        <Message.Content>
                            <Message.Header>Profile update</Message.Header>
                            {this.props.success}
                        </Message.Content>
                    </Message>

                    <Form.Input name="firstName" type="text" placeholder="First name" value={this.state.firstName} onChange={this.handleInputChange} />
                    <Form.Input name="lastName" type="text" placeholder="Last name" value={this.state.lastName} onChange={this.handleInputChange} />
                    <Form.Dropdown placeholder="Select Country" fluid selection 
                        value={this.state.country.short}
                        loading={this.state.optionsLoading} 
                        onClick={this.loadOptions} 
                        options={this.state.options} 
                        onChange={this.handleDropdownChangeCountry}
                    />
                    {(this.state.country.full==="United States")
                    ?<Form.Dropdown placeholder="Select State" fluid selection 
                        value={this.state.state.short} 
                        options={stateOptions} 
                        onChange={this.handleDropdownChangeState} 
                    />
                    :null}
                    <Form.Input name="city" type="text" placeholder="City" value={this.state.city} onChange={this.handleInputChange} />
                    <Form.Button color="teal" fluid>Submit</Form.Button>
                </Form>
            </Segment>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        loading: state.user.profileUpdateLoading,
        error: state.user.profileUpdateError,
        success: state.user.profileUpdateSuccess
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({updateProfile, updateProfileError, updateProfileSuccess}, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(SettingsGeneral);