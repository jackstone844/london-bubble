import { combineReducers } from 'redux';
import { getReducer } from './HomeFeedReducer.js';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    getData: getReducer,
    routing: routerReducer
});

export default rootReducer; 