export function userAddBook(state, action) {
    let newBookList = state.books.slice();
    newBookList.push(action.payload);
    return {
        ...state,
        books: newBookList
    }
}

export function userFetchBooks(state, action) {
    return {
        ...state,
        fetchedBooks: action.payload
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