/**
 * 
 * 
 * Combines both reducers into one object 
 * 
 */

import { combineReducers } from 'redux';
import { getReducer } from './HomeFeedReducer.js';
import { getLocationsReducer } from './LocationFeedReducer.js';

/**
 * Combines both reducers into one object
 * @returns {object} - A reducer that invokes every reducer inside the reducers object, and constructs a state object with the same shape.
 */
const rootReducer = combineReducers({
    HomeFeed: getReducer,
    LocationFeed: getLocationsReducer
});

export default rootReducer;