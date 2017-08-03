import React, {Component} from "react";
import { Segment, Icon, Header, Message, Button, Grid, Card, Image, Loader, Dimmer, Modal, Dropdown } from "semantic-ui-react"
import { bindActionCreators } from "redux";
import { userFetchTrades, userTradesError, userChangeTradeStatus, userCancelTrade } from "../actions";
import { connect } from "react-redux";
import { TRADE_APPROVED, TRADE_DECLINED } from "../constants";

class Trades extends Component{
    constructor(props){
        super(props);
        if(this.props.trades.length <= 0)
            this.props.userFetchTrades();
    }

    render(){
        return (
            <Grid centered verticalAlign="middle" relaxed>
                <Grid.Column mobile={16} computer={14} tablet={14}>
                    <Header as="h2" color="teal"> Trades </Header>
                    <Button icon onClick={() => this.props.userFetchTrades()}><Icon name="refresh"/></Button>
                    <Message error hidden={!this.props.tradesError}>
                        <Message.Content>
                            <Message.Header>Failed to retrieve trades</Message.Header>
                            {this.props.tradesError}
                        </Message.Content>
                    </Message>
                    <Segment loading={this.props.tradesFetchLoading} >
                    <Dropdown text="Filter Trades" icon="filter" floating labeled button className="icon">
                        <Dropdown.Menu>
                            <Dropdown.Header icon="tags" content="Tag Label" />
                            <Dropdown.Menu scrolling>
                                
                            </Dropdown.Menu>
                        </Dropdown.Menu>
                    </Dropdown>
                    <br />
                    <br />
                    <TradesCards {...this.props} />
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

const TradesCards = (props) => {
    const {trades, userId} = props;
    const changeTradeStatus = props.userChangeTradeStatus;
    const handleStatusChangeClick = (trade, status) => {
        if(trade.status === status)
            return;
        changeTradeStatus(trade._id, status);
    }
    const handleCancelClick = (trade) => {
        let tradeId = trade._id;
        props.userCancelTrade(tradeId);
    }
    return (
        <Card.Group itemsPerRow={3} doubling stackable>
            {trades.map((trade, index)=>{
                const userIsSender = trade.sender._id === userId;
                const message1 = (userIsSender)?"You sent":"Sent you";
                const message2 = "Trade request for ";

                let username = (userIsSender)?trade.receiver.username:trade.sender.username;
                username = username.split("");
                username[0] = username[0].toUpperCase();
                username = username.join(""); 

                let color = "grey";
                if(trade.status === TRADE_APPROVED){
                    color = "green";
                }
                if(trade.status === TRADE_DECLINED){
                    color = "red";
                }
                
                //check if loading
                let tempIndexInArray = -1
                if(props.tradeLoading)
                    tempIndexInArray = props.tradeLoading.indexOf(trade._id);
                let isLoading = (tempIndexInArray !== -1);

                return(
                <Card key={index} color={color}>
                    <Dimmer active={isLoading} inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                    <Card.Content extra>
                        <Card.Header >
                             {username}
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <Card.Meta>
                            {message1}
                        </Card.Meta>
                        <Card.Description>
                            {message2}<strong>{trade.book.title}</strong>
                        </Card.Description>
                        
                    </Card.Content>
                    <Card.Content extra>
                        <Card.Meta>
                            {trade.status}
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        {userIsSender
                            ?<Button fluid basic color="red" onClick={ ()=> {handleCancelClick(trade)} }>Cancel</Button>
                            :<div className="ui two buttons">
                                <Button basic color="green" onClick={ () =>{ handleStatusChangeClick(trade, TRADE_APPROVED) } } >Approve</Button>
                                <Button basic color="red" onClick={ () =>{ handleStatusChangeClick(trade, TRADE_DECLINED) } }>Decline</Button>
                            </div>
                        }
                        
                    </Card.Content>
                </Card>
                )

            })}
                        
        </Card.Group>
    );
}

function mapStateToProps(state) {
    return {
        userId: state.user.id,
        tradesError: state.user.tradesError,
        tradesFetchLoading: state.user.tradesFetchLoading,
        trades: state.user.trades,
        tradeLoading: state.user.tradeLoading
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ userFetchTrades, userTradesError, userChangeTradeStatus, userCancelTrade }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(Trades);
