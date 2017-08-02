import React, {Component} from "react";
import { Segment, Icon, Header, Message, Button, Grid, Card, Image, Loader, Dimmer, Modal, Dropdown } from "semantic-ui-react"

class Trades extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Grid centered verticalAlign="middle" relaxed>
                <Grid.Column mobile={16} computer={12} tablet={14}>
                    <Header as="h2" color="teal"> Trades </Header>
                    
                    <Segment>
                    <Dropdown text="Filter Trades" icon="filter" floating labeled button className="icon">
                        <Dropdown.Menu>
                            <Dropdown.Header icon="tags" content="Tag Label" />
                            <Dropdown.Menu scrolling>
                                
                            </Dropdown.Menu>
                        </Dropdown.Menu>
                    </Dropdown>
                    <br />
                    <br />
                    <Card.Group itemsPerRow={3} doubling stackable>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    Steve Sanders
                                </Card.Header>
                                <Card.Meta>
                                    Friends of Elliot
                                </Card.Meta>
                                <Card.Description>
                                    Steve wants to add you to the group <strong>best friends</strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className="ui two buttons">
                                    <Button basic color="green">Approve</Button>
                                    <Button basic color="red">Decline</Button>
                                </div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    Steve Sanders
                                </Card.Header>
                                <Card.Meta>
                                    Friends of Elliot
                                </Card.Meta>
                                <Card.Description>
                                    Steve wants to add you to the group <strong>best friends</strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className="ui two buttons">
                                    <Button basic color="green">Approve</Button>
                                    <Button basic color="red">Decline</Button>
                                </div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    Steve Sanders
                                </Card.Header>
                                <Card.Meta>
                                    Friends of Elliot
                                </Card.Meta>
                                <Card.Description>
                                    Steve wants to add you to the group <strong>best friends</strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className="ui two buttons">
                                    <Button basic color="green">Approve</Button>
                                    <Button basic color="red">Decline</Button>
                                </div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    Steve Sanders
                                </Card.Header>
                                <Card.Meta>
                                    Friends of Elliot
                                </Card.Meta>
                                <Card.Description>
                                    Steve wants to add you to the group <strong>best friends</strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className="ui two buttons">
                                    <Button basic color="green">Approve</Button>
                                    <Button basic color="red">Decline</Button>
                                </div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    Steve Sanders
                                </Card.Header>
                                <Card.Meta>
                                    Friends of Elliot
                                </Card.Meta>
                                <Card.Description>
                                    Steve wants to add you to the group <strong>best friends</strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className="ui two buttons">
                                    <Button basic color="green">Approve</Button>
                                    <Button basic color="red">Decline</Button>
                                </div>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Card.Header>
                                    Steve Sanders
                                </Card.Header>
                                <Card.Meta>
                                    Friends of Elliot
                                </Card.Meta>
                                <Card.Description>
                                    Steve wants to add you to the group <strong>best friends</strong>
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <div className="ui two buttons">
                                    <Button basic color="green">Approve</Button>
                                    <Button basic color="red">Decline</Button>
                                </div>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}



export default Trades;