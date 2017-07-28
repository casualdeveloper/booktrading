import React, { Component } from "react";
import { Button, Grid, Segment, Icon, Header, Message, Input, Item, Card, Image, Divider, Menu } from "semantic-ui-react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchBooks, addBook, searchBooksSuccess } from "../actions";
import { Link, Route } from "react-router-dom";

import SearchSegment from "./Mybooks/Search";
import BookSegment from "./Mybooks/Books";

class Mybooks extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeItem: props.match.params.activeTab || "search"
        };
        this.handleItemClick = (e, { name }) => this.setState({ activeItem: name });
    }

    render(){
        const { activeItem } = this.state;
        const props = this.props;
        return(
            <Grid centered verticalAlign="middle" relaxed>
                <Grid.Column mobile={16} computer={12} tablet={14}>
                    <Menu widths={2}>
                        <Menu.Item as={Link} to="/mybooks/search" name="search" active={activeItem === "search"} onClick={this.handleItemClick} />
                        <Menu.Item as={Link} to="/mybooks/books" name="books" active={activeItem === "books"} onClick={this.handleItemClick} />
                    </Menu>
                    <Route path={"/mybooks/:activeTab"} render={() => <RenderSegment {...props} />}/>
                    <Route exact path={"/mybooks"} render={() => (
                        <SearchSegment {...props} />
                    )}/>
                    
                </Grid.Column>
            </Grid>
        );
    }
}

const RenderSegment = (props) => {
    if(props.match.params.activeTab === "search"){
        return <SearchSegment {...props} />;
    }
    if(props.match.params.activeTab === "books"){
        return <BookSegment {...props} />;
    }
}

function mapStateToProps(state){
    return {
        searchLoading: state.books.bookSearchLoading,
        searchError: state.books.bookSearchError,
        searchFound: state.books.bookSearchResults,
        addBookLoading: state.books.addBookLoading,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({searchBooks, addBook, searchSetResults: searchBooksSuccess}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Mybooks);