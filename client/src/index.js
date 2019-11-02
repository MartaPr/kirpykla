import React from 'react'
import ReactDOM from 'react-dom'
import './resources/styles.css'
import './resources/tablet.css'
import './resources/mobile.css'
import  Routes from './routes'
import { BrowserRouter} from 'react-router-dom'

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleWare from 'redux-promise'
import ReduxThunk from 'redux-thunk'

import Reducer from './reducers'

const createStoreWithMiddleWare = applyMiddleware(promiseMiddleWare, ReduxThunk) (createStore);


ReactDOM.render(
    <Provider store={createStoreWithMiddleWare(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}> 
        <BrowserRouter> 
            <Routes />
        </BrowserRouter>
    </Provider>, 
document.getElementById('root'));
