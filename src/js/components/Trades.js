import React, {Component} from "react";
import { Segment, Icon, Header, Message, Button, Grid, Card, Image, Loader, Dimmer, Modal, Dropdown } from "semantic-ui-react"
import { bindActionCreators } from "redux";
import { userFetchTrades, userTradesError, userChangeTradeStatus, userCancelTrade } from "../actions";
import { connect } from "react-redux";
import { TRADE_APPROVED, TRADE_DECLINED, TRADE_PENDING } from "../constants";


const tradeFilterOptions = [
    { key: 1, text: "Sent", value: 1 },
    { key: 2, text: "Reveived", value: 2 },
    { key: 3, text: "Approved", value: 3 },
    { key: 4, text: "Declined", value: 4 },
    { key: 5, text: "Pending", value: 5 }
]

const renderLabel = (label, index, props) => ({
    color: "teal",
    content: label.text,
})

class Trades extends Component{
    constructor(props){
        super(props);
        if(this.props.trades.length <= 0)
            this.props.userFetchTrades();

        this.state = {
            value: [],
            options: tradeFilterOptions
        }

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    handleDropdownChange(e, data) {
        this.setState({ value: data.value });
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
                    <Dropdown
                        multiple
                        selection
                        fluid
                        options={this.state.options}
                        placeholder="Choose filter option"
                        renderLabel={renderLabel}
                        value={this.state.value}
                        onChange={this.handleDropdownChange}
                    />
                    <br />
                    <br />
                    <TradesCards {...this.props} filterOptions={this.state.options} activeFilters={this.state.value}/>
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
    const shouldRender = (trade) => {
        //filter is divided into 2 categories
        //1st - sent/received, 2nd - pending/approved/declined
        //variable firstNeedAdded set to true if at least one of the filters are from 1st group
        //variable secondNeedAdded set to true if at least one of the filter are from 2nd group
        //filterCounter checks how many filters trade card passes
        //if card passes at least one filter from each group(or 1 group) we show that card

        let shouldRender = false;
        let filters = props.activeFilters;
        if(filters.length > 0){
            let filterCounter = 0;
            let filterCountNeeded = 0;
            let firstNeedAdded = false, secondNeedAdded = false;
            for(let i = 0; i < filters.length; i++){
                if(filters[i] === 1 || filters[i] === 2){
                    if(!firstNeedAdded){
                        filterCountNeeded++;
                        firstNeedAdded = true;
                    }
                    //sent
                    if(filters[i] === 1){
                        if(trade.sender._id === userId)
                        filterCounter++;
                    }
                    //received
                    if(filters[i] === 2){
                        if(trade.receiver._id === userId)
                            filterCounter++;
                    }
                }
                if(filters[i] >= 3){
                    if(!secondNeedAdded){
                        filterCountNeeded++;
                        secondNeedAdded = true;
                    }
                    //approved
                    if(filters[i] === 3){
                        if(trade.status === TRADE_APPROVED)
                            filterCounter++;
                    }
                    //declined
                    if(filters[i] === 4){
                        if(trade.status === TRADE_DECLINED)
                            filterCounter++;
                    }
                    //pending
                    if(filters[i] === 5){
                        if(trade.status === TRADE_PENDING)
                            filterCounter++;
                    }
                }
                
            }
            shouldRender = (filterCounter >= filterCountNeeded);
        }else{
            shouldRender = true;
        }
        return shouldRender;
    }
    return (
        <Card.Group itemsPerRow={3} doubling stackable>
            {trades.map((trade, index)=>{
                
                if(!shouldRender(trade))
                    return null;

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
