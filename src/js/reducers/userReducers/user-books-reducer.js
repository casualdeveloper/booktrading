export function userAddBook(state, action) {
    let newBookList = state.books.slice();
    newBookList.push(action.payload);
    return {
        ...state,
        books: newBookList
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