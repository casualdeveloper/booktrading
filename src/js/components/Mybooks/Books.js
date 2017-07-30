import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userFetchBooks } from "../../actions";
import { Segment, Card, Image } from "semantic-ui-react"

class BookSegment extends Component {
    constructor(props){
        super(props);
        this.props.userFetchBooks();
    }
    render(){
        const books = this.props.fetchedBooks || [];

        return(
            <Segment loading={this.props.fetchBooksLoading}>
                {(books.length <= 0)
                    ?<h2>You don't have any books</h2>
                    :<Books books={books} />
                }
            </Segment>
        );
    }
}

const Books = ({books}) => {
    return (
        <Card.Group itemsPerRow={3} stackable doubling>
            {books.map((obj,index) => {
                return <Book book={obj} key={index}  />    
            })}
        </Card.Group>
    );
}

const Book = ({book}) => {
    return (
        <Card link >
            {book.image?<Image wrapped src={book.image} />:null}
            <Card.Content>
                <Card.Header>{book.title}</Card.Header>
            </Card.Content>
        </Card>
    );
}

function mapStateToProps(state){
    return {
        fetchBooksLoading: state.user.fetchBooksLoading,
        fetchBooksError: state.user.fetchBooksError,
        fetchedBooks: state.user.fetchedBooks
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ userFetchBooks }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookSegment);