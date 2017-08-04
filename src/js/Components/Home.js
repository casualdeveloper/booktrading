import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Icon, Header, Message, Button, Grid, Card, Image, Loader, Dimmer, Modal } from "semantic-ui-react"
import LazyImage from "./LazyImage";
import DefaultBookCover from "./DefaultBookCover";
import { bindActionCreators } from "redux";
import { fetchBooks, fetchBooksError, userNewTrade, userNewTradeError, userNewTradeSuccess } from "../actions";

class Home extends Component {
    constructor(props){
        super(props);
        if(this.props.books && this.props.books.length <= 0)
            this.props.fetchBooks(this.props.lastBook);
        this.handleLoadMore = this.handleLoadMore.bind(this);
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
                        <Books books={this.props.books} {...this.props} />
                        <br />
                        <Button primary onClick={this.handleLoadMore} loading={loadMoreLoad}>Load More</Button>
                    </Grid.Column>
                </Grid>
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

        //delete trade errors if there were any;
        if(this.props.newTradeError)
            this.props.userNewTradeError(null);
        //delete trade success message if there is one;
        if(this.props.newTradeSuccess)
            this.props.userNewTradeSuccess(null);
    }

    setActiveBook(book){
        this.setState({ activeBook: book })
    }


    render(){
        const books = this.props.books;
        return (
            <div>
                <Card.Group itemsPerRow={5} doubling>
                    {books.map((obj,index) => {
                        return <Book book={obj} key={index} setActiveBook={this.setActiveBook} openModal={this.handleModalOpen}  />    
                    })}
                </Card.Group>
                <BookModal book={this.state.activeBook} modalOpen={this.state.modalOpen} closeModal={this.handleModalClose} {...this.props}  />
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


const BookModal = ({book, modalOpen, closeModal, userIsAuth, userId, userNewTrade, newTradeLoading, newTradeError, newTradeSuccess}) => {
    let showTradeButton = false;
    if(userIsAuth && book._owner !== userId)
        showTradeButton = true;

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
                {showTradeButton
                    ?<Button loading={newTradeLoading} color="green" onClick={() => { userNewTrade(book._id) }} >Trade</Button>
                    :null
                }
                <Button onClick={closeModal}>Close</Button>
            </Modal.Actions>
            <Message error hidden={!newTradeError}>
                <Message.Content>
                    <Message.Header>Failed to request trade</Message.Header>
                    {newTradeError}
                </Message.Content>
            </Message>
            <Message positive hidden={!newTradeSuccess}>
                <Message.Content>
                    <Message.Header>Trade request sent successfully</Message.Header>
                    {newTradeSuccess}
                </Message.Content>
            </Message>
        </Modal>
    )
}


function mapStateToProps(state) {
    return {
        userIsAuth: state.user.isAuth,
        userId: state.user.id,
        books: state.books.books,
        booksLoading: state.books.booksFetchLoading,
        booksError: state.books.booksFetchError,
        lastBook: state.books.lastBook,
        newTradeError: state.user.newTradeError,
        newTradeLoading: state.user.newTradeLoading,
        newTradeSuccess: state.user.newTradeSuccess
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchBooks, fetchBooksError, userNewTrade, userNewTradeError, userNewTradeSuccess}, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);