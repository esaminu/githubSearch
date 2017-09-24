import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware} from 'redux'
import reducer from './reducers/mainReducer'
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createLogger} from 'redux-logger'
import Routes from './routes'

const store = createStore(reducer,applyMiddleware(ReduxThunk,createLogger({collapsed: true})))

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>, document.getElementById('root'));
registerServiceWorker();