import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { userFetchBooks, userFetchBooksError } from "../../actions";
import { Segment, Card, Image, Header, Modal, Button, Message } from "semantic-ui-react";
import LazyImage from "../LazyImage";

class BookSegment extends Component {
    constructor(props){
        super(props);
        if(this.props.fetchedBooks && this.props.fetchedBooks.length <= 0)
            this.props.userFetchBooks(this.props.lastBook);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    handleLoadMore(){
        this.props.userFetchBooks(this.props.lastBook);
    }

    componentWillUnmount(){
        this.props.userFetchBooksError(null);
    }
    render(){
        const loadMoreLoad = !!(this.props.fetchBooksLoading);
        return(
            <div>
                <Header as="h2" color="teal">My Books</Header>
                <Message error hidden={!this.props.fetchBooksError}>
                    <Message.Content>
                        <Message.Header>Failed to retrieve books</Message.Header>
                        {this.props.fetchBooksError}
                    </Message.Content>
                </Message>
                <Segment>
                    {(this.props.fetchedBooks.length <= 0)
                        ?<h2>You don't have any books</h2>
                        :<Books books={this.props.fetchedBooks} />
                    }
                    <br />
                    <Button primary onClick={this.handleLoadMore} loading={loadMoreLoad}>Load More</Button>
                </Segment>
            </div>
        );
    }
}

class Books extends Component {
    constructor(props){
        super(props);

        this.state = {
            modalOpen: false,
            activeBook: {}
        }

        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.setActiveBook = this.setActiveBook.bind(this);
    }

    handleModalOpen(){
        this.setState({modalOpen: true});
    }

    handleModalClose(){
        this.setState({modalOpen: false});
    }

    setActiveBook(book){
        this.setState({ activeBook: book })
    }
    render(){
        const books = this.props.books;
        return (
            <div>
                <Card.Group itemsPerRow={3} doubling>
                    {books.map((obj,index) => {
                        return <Book book={obj} key={index} setActiveBook={this.setActiveBook} openModal={this.handleModalOpen} />    
                    })}
                </Card.Group>
                <BookModal book={this.state.activeBook} modalOpen={this.state.modalOpen} closeModal={this.handleModalClose}  />
            </div>
        )
    }
}

class Book extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const image = this.props.book.image;
        return (
            <Card link raised className="square-card" onClick={() => { this.props.setActiveBook(this.props.book); this.props.openModal() }}>
                <LazyImage image={image}>
                    <Image wrapped src={image} />
                </LazyImage>
            </Card>        
        )
    }
}


const BookModal = ({book, modalOpen, closeModal}) => {
    return (
        <Modal open={modalOpen} onClose={closeModal} basic>
            <Modal.Header>{book.title}</Modal.Header>
            <Modal.Content image scrolling>
                {book.image?<Image size="medium" src={book.image} />:null}
                <Modal.Description>
                    <p className="inline-text">
                        <h4>Authors:  </h4>
                        {book.authors}
                    </p>
                    <p>{book.description}</p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                 <Button onClick={closeModal}>Close</Button>
            </Modal.Actions>
        </Modal>
    )
}


function mapStateToProps(state){
    return {
        fetchBooksLoading: state.user.fetchBooksLoading,
        fetchBooksError: state.user.fetchBooksError,
        fetchedBooks: state.user.fetchedBooks,
        lastBook: state.user.lastBook
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ userFetchBooks, userFetchBooksError }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookSegment);