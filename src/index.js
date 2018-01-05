import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import NavBar, { 
    NavButton, 
    NavButtonText, 
    NavTitle 
} from 'react-bootstrap';
import {
    Route,
    NavLink,
    HashRouter,
} from "react-router-dom";

import Home from './containers/HomeFeed.jsx';
import About from './containers/AboutUs.jsx';
import Navigation from './components/Navigation.jsx';

import configureStore from './store/configureStore';
import fire from './firebase.config.js';

import '../public/styles/styles.css';
import './libs/bootstrap-3.3.6/dist/css/bootstrap.css';
import './libs/font-awesome/css/font-awesome.min.css';

import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

console.log(syncHistoryWithStore);

// Configure React store 
const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(createBrowserHistory(), store)

const main = (
    <Provider store={store}>
        <Router history={history}>
                <Navigation/>
        </ Router>
    </Provider>
);

ReactDOM.render(
    main, 
    document.getElementById('root') 
); 
