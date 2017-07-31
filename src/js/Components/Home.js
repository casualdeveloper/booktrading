import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Icon, Header, Message, Button, Grid, Card, Image, Loader, Dimmer } from "semantic-ui-react"
import LazyImage, { init as LazyImagePreload } from "./LazyImage";
import DefaultBookCover from "./DefaultBookCover";
import { bindActionCreators } from "redux";
import { fetchBooks, fetchBooksError } from "../actions";

class Home extends Component{
    constructor(props){
        super(props);
        this.props.fetchBooks(this.props.lastBook);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        LazyImagePreload();
    }

    handleLoadMore(){
        this.props.fetchBooks(this.props.lastBook);
    }

    componentWillUnmount(){
        this.props.fetchBooksError(null);
    }

    render(){
        const loadMoreLoad = !!(this.props.booksLoading);
        return(
            <div>
                <Grid centered verticalAlign="middle" relaxed>
                    <Grid.Column mobile={16} computer={12} tablet={14}>
                        <Message error hidden={!this.props.booksError}>
                            <Message.Content>
                                <Message.Header>Failed to retrieve books</Message.Header>
                                {this.props.booksError}
                            </Message.Content>
                        </Message>
                        <Books books={this.props.books} />
                        <br />
                        <Button primary onClick={this.handleLoadMore} loading={loadMoreLoad}>Load More</Button>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

const Books = ({books}) => {
    return (
        <Card.Group itemsPerRow={5} stackable doubling>
            {books.map((obj,index) => {
                return <Book book={obj} key={index}  />    
            })}
        </Card.Group>
    )
}

class Book extends Component {
    render(){
        const image = this.props.book.image;
        return (
            <Card link raised >
                <LazyImage image={image}>
                    <Image wrapped src={image} />
                </LazyImage>
                {/*<Card.Content>
                    <Card.Header>{book.title}</Card.Header>
                </Card.Content>*/}
            </Card>        
        )
    }

}



function mapStateToProps(state){
    return {
        books: state.books.books,
        booksLoading: state.books.booksFetchLoading,
        booksError: state.books.booksFetchError,
        lastBook: state.books.lastBook
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchBooks, fetchBooksError}, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);