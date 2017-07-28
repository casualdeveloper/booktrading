export function bookSearch(state, action) {
    return {
        ...state,
        searchingFor: action.payload
    }
}

export function bookSearchSuccess(state,action) {
    return {
        ...state,
        bookSearchResults: action.payload,
    }
}

export function bookSearchError(state, action) {
    return {
        ...state,
        bookSearchError: action.payload
    }
}

export function bookSearchLoading(state, action) {
    return {
        ...state,
        bookSearchLoading: action.payload
    }
}

export function bookAddBook(state,action) {
    let newBookList = state.books.slice();
    newBookList.push(action.payload);
    return {
        ...state,
        books: newBookList
    }
}

export function bookAddBookError(state, action){
    return {
        ...state,
        bookAddError: action.payload
    }
}

export function bookAddBookLoading(state, action) {
    return {
        ...state,
        bookAddLoading: action.payload
    }
}