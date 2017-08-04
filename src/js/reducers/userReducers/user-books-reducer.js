export function userAddBook(state, action) {
    let newBookList = state.books.slice();
    newBookList.push(action.payload);
    return {
        ...state,
        books: newBookList
    }
}

export function userAddBookError(state, action){
    return {
        ...state,
        bookAddError: action.payload
    }
}

export function userAddBookLoading(state, action) {
    return {
        ...state,
        bookAddLoading: action.payload
    }
}

export function userDeleteBook(state, action){
    let bookId = action.payload;
    let books = state.books;
    let fetchedBooks = state.fetchedBooks;
    let lastBook = state.lastBook;

    let index1 = books.indexOf(bookId);// index of books array (array only hold id values)
    let index2 = fetchedBooks.findIndex(obj => obj._id === bookId);// index of fetchedBooks - array that holds full book information

    if(index1 !== -1)
        books.splice(index1, 1);

    if(index2 !== -1)
        fetchedBooks.splice(index2, 1);

    if(fetchedBooks.length <= 0)
        lastBook = null;

    if(lastBook === bookId)
        lastBook = fetchedBooks[fetchedBooks.length - 1]._id;

    return {
        ...state,
        fetchedBooks,
        books,
        lastBook
    }

}

export function userDeleteBookError(state, action){
    return {
        ...state,
        deleteBookError: action.payload
    }
}

export function userDeleteBookLoading(state, action){
    return {
        ...state,
        deleteBookLoading: action.payload
    }
}

export function userFetchBooks(state, action) {
    let tempOldBooks = state.fetchedBooks;
    let newBooks = tempOldBooks.concat(action.payload)
    return {
        ...state,
        fetchedBooks: newBooks,
        lastBook: action.lastBook
    }
}

export function userFetchBooksLoading(state, action) {
    return {
        ...state,
        fetchBooksLoading: action.payload
    }
}

export function userFetchBooksError(state, action) {
    return {
        ...state,
        fetchBooksError: action.payload
    }
}