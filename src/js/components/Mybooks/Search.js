import React, { Component } from "react";
import { Button, Grid, Segment, Icon, Header, Message, Input, Item, Card, Image, Divider } from "semantic-ui-react"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { searchBooks, addBook, searchBooksSuccess, addBookError, searchBooksError } from "../../actions";

class SearchSegment extends Component {
    constructor(props){
        super(props);

        this.state = {
            search: "",
            hidden: true
        }

        this.submit = this.submit.bind(this);
        this.handleSearchChange = (e, { value }) => { this.setState( { search: value } ) };
        this.flipHidden = this.flipHidden.bind(this);
    }

    submit(e){
        e.preventDefault();
        this.props.searchSetResults(null);// delete previouse search results
        this.props.searchBooks({search: this.state.search});
        this.setState({hidden: false});
    }

    flipHidden(){
        this.setState({hidden:!this.state.hidden});
    }

    componentWillUnmount(){
        this.props.setAddBookError(null);
        this.props.setSearchBooksError(null);
    }

    render(){
        let hidden = this.state.hidden;
        let isErrorHidden = !(this.props.addBookError || this.props.searchError);

        return(
            <div>
                <Header as="h2" color="teal">Search For Books</Header>
                <Segment raised>
                    <Message error hidden={isErrorHidden}>
                        <Message.Content>
                            <Message.Header>Failed to add book</Message.Header>
                            {this.props.addBookError}
                            {this.props.searchError}
                        </Message.Content>
                    </Message>
                    <Input onChange={this.handleSearchChange} action={
                        <Button onClick={this.submit} loading={this.props.searchLoading} animated="fade" >
                            <Button.Content visible>Search</Button.Content>
                            <Button.Content hidden>
                                <Icon name="search"/>
                            </Button.Content>
                        </Button>
                    } placeholder="Search..." value={this.state.search} />
                    {(this.props.searchFound && !hidden)?<SearchResultCards {...this.props} hide={this.flipHidden} />:null}
                </Segment>
            </div>
        )
    }
}

class SearchResultCards extends Component {
    constructor(props){
        super(props);

        this.state = {
            activeId: 0
        }

        this.data = this.props.searchFound;
        this.addBook = this.props.addBook;
        this.submit = this.submit.bind(this);
        this.active = this.active.bind(this);
    }

    submit(e){ 
        e.preventDefault;
        let book = this.data.items[this.state.activeId];
        let newBookObj = this.extractBookObj(book)
        this.addBook(newBookObj);
    }
    
    active(activeId){
        this.setState({activeId});
    }

    extractBookObj(obj, index=null){
        let book = obj.volumeInfo;
        let authors = null;
        if(book.authors){
            authors = book.authors.join(", ");
            // replace last "," with "."
            let tempAuthors = authors.split("");
            tempAuthors.splice(tempAuthors.length-2, 2, ".");

            authors = tempAuthors.join("");
        }
        let image = "http://via.placeholder.com/300x450?text=No+Image";
        if(book.imageLinks){
            image = book.imageLinks.thumbnail;
            let zoomSize = "zoom=".length;
            let imageZoomIndex = image.indexOf("zoom=1");   
            let tempImageArr = image.split("");
            tempImageArr.splice(imageZoomIndex+zoomSize, 1, "2"); // replace zoom=1 to zoom=2
            image = tempImageArr.join("");
            image = image.split("&edge=curl").join("");//remove &edge=curl
        }
        let title = book.title;
        let description = book.description;

        return { authors, image, title, description, index }

    }

    render(){
        let activeBook = this.extractBookObj(this.data.items[this.state.activeId]);
        return(
        <div>
            <Divider />
            <Button attached="top" onClick={this.props.hide}>Hide</Button>
            <Divider />
            <ActiveItem book={activeBook} submit={this.submit} addBookLoading={this.props.addBookLoading}/>
            <Divider />
            <Card.Group itemsPerRow={3} stackable doubling>
                {this.data.items.map((obj,index) => {
                    return <SearchResultCard active={this.active} key={index} {...this.extractBookObj(obj,index)}  />    
                })}
            </Card.Group>
            <Divider />
            <Button attached="bottom" onClick={this.props.hide}>Hide</Button>
        </div>
        );
    }
}

const ActiveItem = ({ book, submit, addBookLoading }) => {
    return(
        <Item>
            <Item.Image size="medium" src={book.image} />

            <Item.Content>
                <Item.Header>{book.title}</Item.Header>
                <Item.Meta>By - {book.authors}</Item.Meta>
                <Item.Description>
                    <p>{book.description}</p>
                </Item.Description>
                <Item.Extra>
                    <Button fluid positive onClick={submit} loading={addBookLoading}>Add</Button>
                </Item.Extra>
            </Item.Content>
        </Item>
    );
}

const SearchResultCard = ({ image, title, index, active }) => {
    return (
        <Card link onClick={() => active(index)} >
            {image?<Image wrapped src={image} />:null}
            <Card.Content>
                <Card.Header>{title}</Card.Header>
            </Card.Content>
        </Card>
    );
}

function mapStateToProps(state){
    return {
        searchLoading: state.books.bookSearchLoading,
        searchError: state.books.bookSearchError,
        searchFound: state.books.bookSearchResults,
        addBookLoading: state.books.bookAddLoading,
        addBookError: state.books.bookAddError
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({searchBooks, addBook, searchSetResults: searchBooksSuccess, setAddBookError: addBookError, setSearchBooksError: searchBooksError }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchSegment);