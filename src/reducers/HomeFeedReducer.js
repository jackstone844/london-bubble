import { combineReducers } from 'redux';
import {
    GET_VENUE_REQUESTED,
    GET_VENUES_REJECTED,
    GET_VENUES_FULFILLED
} from '../constants/ActionTypes.js';

const initalState = {
    status: 'initial',
    isFetching: true
};

/* 
When an action is dispatch, the store calls getReducer
with the current state and the action object that was
dispatched.

The reducer returns the new state to the store, after 
the action object has been merged with the previous state.

The redux store saves the new state.

React redux then calls getState & components are updated.
*/
export function getReducer(state = initalState, action) {
    switch(action.type) {
        case GET_VENUE_REQUESTED:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                status: action.status
            });
        case GET_VENUES_FULFILLED:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                status: action.status,
                venues: action.venues
            });
        case GET_VENUES_REJECTED:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                status: action.status
            });
        default:
            return state;
    }
}

/*
const rootReducer = combineReducers({
    HomeFeed: getReducer
});
*/

//export default rootReducer;