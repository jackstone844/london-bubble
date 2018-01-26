/**
 * The apps root component. Acts as the entry point of the website, which is rendered 
 * into div container with an id of root in index.html
 */

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
    Router
} from "react-router-dom";
import { browserHistory } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'

import Home from './containers/HomeFeed.jsx';
import Locations from './containers/LocationFeed.jsx';
import Navigation from './components/Navigation.jsx';

import configureStore from './store/configureStore';
import fire from './firebase.config.js';

import '../public/styles/styles.css';
import './libs/bootstrap-3.3.6/dist/css/bootstrap.css';
import './libs/font-awesome/css/font-awesome.min.css';

/**
 * A reference the redux store that is passed into
 * the react-redux Provider as a store prop.
 */
const store = configureStore();

/**
 * A reference to create a new browser history that 
 * is passed into the Router as a history prop.
 */
const newHistory = createBrowserHistory();

/**
 * The root of the app.
 */
const main = (
    <Provider store={store}>
        <Router history={newHistory}>
                <Navigation/>
        </ Router>
    </Provider>
);

ReactDOM.render(
    main, 
    document.getElementById('root') 
); 
