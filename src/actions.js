import BookSuggestion from './Book'
import {push} from 'connected-react-router'

const TYPED_QUERY = 'TYPED_QUERY';
const SEARCH = 'SEARCH';
const SELECT_BOOK = 'SELECT_BOOK';
export const TYPES = {TYPED_QUERY, SEARCH, SELECT_BOOK, CHANGE_TITLE: 'CHANGE_TITLE'};
export const SUGGESTION_ACTIONS = {
    FETCH_SUGGESTION_START: "FETCH_SUGGESTION_START",
    FETCH_SUGGESTION_SUCCESS: "FETCH_SUGGESTION_SUCCESS",
    FETCH_SUGGESTION_FAILED: "FETCH_SUGGESTION_FAILED"
};
export const SEARCH_ACTIONS = {
    FETCH_SEARCH_START: "FETCH_SEARCH_START",
    FETCH_SEARCH_SUCCESS: "FETCH_SEARCH_SUCCESS",
    FETCH_SEARCH_FAILED: "FETCH_SEARCH_FAILED",
    LOAD_MORE: "LOAD_MORE",
    LOAD_MORE_SUCCESS: "LOAD_MORE_SUCCESS"
};
export const BOOK_ACTIONS = {
    FETCH_BOOK_START: "FETCH_BOOK_START",
    FETCH_BOOK_SUCCESS: "FETCH_BOOK_SUCCESS",
    FETCH_BOOK_FAILED: "FETCH_BOOK_FAILED"
};

export function onTyped(text) {
    return (dispatch, getState) => {
        dispatch(getTypedAction(text));
        fetchBooks("/suggestions?keyword=" + text).then((res) => {
            dispatch(getSuggestionSuccess({
                suggestions: res.suggestions.map((book) => new BookSuggestion(book.id, book.title, book.author)),
                remainingCount: res.count
            }));
        });
        console.log(getState());
    }
}

function fetchBooks(url) {
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    // Examine the text in the response
                    response.json().then(function (data) {
                        resolve(data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
                reject(err);
            });

    });
}

function getTypedAction(text) {
    return {
        type: TYPED_QUERY,
        text: text
    };
}

function getSearchAction(text) {
    return {
        type: SEARCH,
        text: text
    }
}

function getSuggestionSuccess(obj) {
    return {
        type: SUGGESTION_ACTIONS.FETCH_SUGGESTION_SUCCESS,
        ...obj
    };
}

function getSearchSuccess(obj) {
    return {
        type: SEARCH_ACTIONS.FETCH_SEARCH_SUCCESS,
        ...obj
    };
}

function getLoadSuccess(obj) {
    return {
        type: SEARCH_ACTIONS.LOAD_MORE_SUCCESS,
        ...obj
    }
}

export function loadMore(text, page) {
    return (dispatch, getState) => {
        dispatch({type: SEARCH_ACTIONS.LOAD_MORE});
        console.log("loading");
        searchBooks(text, page).then((res) => {
            console.log("loaded");
            dispatch(getLoadSuccess({
                results: res.suggestions.map((book) => new BookSuggestion(book.id, book.title, book.author)),
                nextPage: res.nextPage,
                keyword: text
            }));
//            dispatch(redirect("/results/"+text));
        });
        console.log(getState());
    }

}

export function searchKeyword(keyword) {
    return (dispatch) => {
        dispatch(push("/results/" + keyword));
    }
}

export function search(text) {
    return (dispatch, getState) => {
        dispatch(getSearchAction(text));
        searchBooks(text, 1).then((res) => {
            dispatch(getSearchSuccess({
                results: res.suggestions.map((book) => new BookSuggestion(book.id, book.title, book.author)),
                nextPage: res.nextPage,
                keyword: text
            }));
        });
        console.log(getState());
    }
}

function searchBooks(keyword, nextPage = 1) {
    console.log("fetch");
    return new Promise(function (resolve, reject) {
        fetch("/results?keyword=" + keyword + "&page=" + nextPage)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log(data);
                        resolve(data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
                reject(err);
            });

    });
}

function getSelectBookAction(book) {
    return {type: SELECT_BOOK, book: book};
}

function getBookSelectedSuccess(book) {
    return {type: BOOK_ACTIONS.FETCH_BOOK_SUCCESS, book: book};
}

export function loadBook(id) {

    return (dispatch) => {
        dispatch(getSelectBookAction(id));
        fetchBook("/book?id=" + id).then(result => {
            dispatch(getBookSelectedSuccess(result));
        });
    }
}

export function selectBook(id) {
    return (dispatch) => {
        dispatch(push("/book/" + id));
    };
}

function fetchBook(url) {
    return new Promise(function (resolve, reject) {
        fetch(url)
            .then(
                function (response) {
                    console.log(response);
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log("xt");
                        resolve(data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
                reject(err);
            });

    });
}


export function changeTitle(title) {
    return {
        type: TYPES.CHANGE_TITLE,
        title: title
    }
}