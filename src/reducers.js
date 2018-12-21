import {combineReducers} from 'redux';
import {BOOK_ACTIONS, SEARCH_ACTIONS, SUGGESTION_ACTIONS, TYPES} from './actions';
import {connectRouter} from "connected-react-router";

const suggestion = (state = {
    typedWord: '',
    searchedWord: '',
    typed: false,
    suggestions: [],
    remainingResults: 0
}, action) => {
    switch (action.type) {
        case TYPES.TYPED_QUERY:
            let text = action.text;
            return Object.assign({}, state, {typedWord: text || '', typed: true});
        case SUGGESTION_ACTIONS.FETCH_SUGGESTION_START:
            return state;
        case TYPES.SEARCH:
            return Object.assign({}, state, {searchedWord: text || ''});
        case SUGGESTION_ACTIONS.FETCH_SUGGESTION_SUCCESS:
            return Object.assign({}, state, {suggestions: action.suggestions, remainingResults: action.remainingCount});
        default:
            return state;
    }
};
const search = (state = {
    results: [],
    isLoading: false
}, action) => {
    switch (action.type) {
        case  TYPES.SEARCH:
            return Object.assign({}, state, {isLoading: true});
        case SEARCH_ACTIONS.FETCH_SEARCH_SUCCESS:
            return Object.assign({}, state, {results: action.results, nextPage: action.nextPage, isLoading: false});
        case SEARCH_ACTIONS.LOAD_MORE:
            return state;
        case SEARCH_ACTIONS.LOAD_MORE_SUCCESS:
            return Object.assign({}, state, {
                results: state.results.concat(action.results),
                nextPage: action.nextPage,
                isLoading: false
            });
        default:
            return state;
    }
};
const book = (state = {
    selectedBook: undefined,
    isLoading: false,
    id: 0
}, action) => {
    switch (action.type) {
        case TYPES.SELECT_BOOK:
            return Object.assign({}, state, {isLoading: true, id: action.book});
        case BOOK_ACTIONS.FETCH_BOOK_SUCCESS:
            return Object.assign({}, state, {selectedBook: action.book, isLoading: false});
        default:
            return state;
    }
};
const navigation = (state = {
    isHome: true,
    title: "GoodAbc",
    path: "/",
    redirect: false
}, action) => {
    switch (action.type) {
        case SEARCH_ACTIONS.FETCH_SEARCH_SUCCESS:
            return Object.assign({}, state, {path: "/results/" + action.keyword, redirect: true});
        case TYPES.REDIRECTED:
            return Object.assign({}, state, {redirect: false});
        case TYPES.CHANGE_TITLE:
            return Object.assign({}, state, {title: action.title});
        default:
            return state;
    }

};
export default (history) => combineReducers({router: connectRouter(history), suggestion, search, book, navigation});