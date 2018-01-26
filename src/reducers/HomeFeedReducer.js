/**
 * Reducers specify how the apps state changes in response to actions sent to the store.
 * The store dispatches actions to the reducer and expects a pure function to return a
 * pure object as the next state. 
 * A reducer takes the previous state, an action and returns the next state ... (prev state, action) => nextState
 */

import { combineReducers } from 'redux';
import {
    GET_VENUE_REQUESTED,
    GET_VENUES_REJECTED,
    GET_VENUES_FULFILLED
} from '../constants/ActionTypes.js';

/**
 * Redux calls our reducer with an undefined state for the first time
 * so initialState will be returned as our initial state
 * @type {object} initialState
 */
const initalState = {
    status: 'initial',
    isFetching: true
};

/*
When an action is dispatched, the store calls rootReducer, which runs
getReducer & locationReducer with the previous state and the action 
object that was dispatched.

The reducer returns the new state to the store, after 
the action object has been merged with the previous state.

The redux store saves the new state snd React redux then calls getState to re-render connected components

?? 
state = initialState is ES6 default arguments syntax, which is the same as:
    if (typeod state === 'undefined') return initialState
??

@param {}

*/

/**
 * HomeFeed getReducer
 * @param {object} state 
 * @param {object} action
 * @return {object} state (next state as a result of dispatching the action) 
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