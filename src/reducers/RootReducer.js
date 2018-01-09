import { combineReducers } from 'redux';
import { getReducer } from './HomeFeedReducer.js';
import { getLocationsReducer } from './LocationFeedReducer.js';

const rootReducer = combineReducers({
    HomeFeed: getReducer,
    LocationFeed: getLocationsReducer
});

export default rootReducer;