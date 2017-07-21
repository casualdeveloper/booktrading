import React, { Component } from "react";
import { Button, Form, Grid, Segment, Icon, Header, Message, Menu } from "semantic-ui-react"
import { Link, Route } from "react-router-dom";

import SettingsGeneral from "./Settings/General";
import SettingsSecurity from "./Settings/Security";

class Settings extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeItem: props.match.params.activeTab || "general"
        };
        this.handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    }

    render(){
        const { activeItem } = this.state;

        //console.log(this.props);
        return(
            <Grid centered verticalAlign="middle" relaxed>
                    <Grid.Column mobile={16} computer={8} tablet={10}>
                        <Header as="h2" icon>
                            <Icon name="settings" />
                            Account Settings
                        </Header>
                        <Menu widths={2}>
                            <Menu.Item as={Link} to="/settings/general" name="general" active={activeItem === "general"} onClick={this.handleItemClick} />
                            <Menu.Item as={Link} to="/settings/security" name="security" active={activeItem === "security"} onClick={this.handleItemClick} />
                        </Menu>
                        <Route path={"/settings/:activeTab"} component={RenderSegment}/>
                        <Route exact path={"/settings"} render={() => (
                            <SettingsGeneral />
                        )}/>
                    </Grid.Column>
                </Grid>
        );
    }
}

const RenderSegment = ({ match }) => {
    if(match.params.activeTab === "general"){
        return <SettingsGeneral />;
    }
    if(match.params.activeTab === "security"){
        return <SettingsSecurity />;
    }

}

export default Settings;