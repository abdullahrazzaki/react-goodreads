import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'

const history = createBrowserHistory();

console.log("history", history);
const store = createStore(rootReducer(history), applyMiddleware(thunkMiddleware, routerMiddleware(history)));

ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
