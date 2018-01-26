/**
 * Relevant action types are imported from the constants/ActionTypes.js directory
 * This module creates three standard action creators that will be dispatched 
 * by the store in a Thunk action creator as an async operation.
 * Objective of Thunk action creator is to fetch the venues data from 
 * FireBase database and update the store / state.
 */ 

import database from '../firebase.config.js';
import {
    GET_VENUE_REQUESTED,
    GET_VENUES_REJECTED,
    GET_VENUES_FULFILLED
} from '../constants/ActionTypes.js';


/**
 * HomeFeed Standard Action Creators
 */

/**
 * Action to be dispatched when requesting venues from FireBase
 * @return {Object}
 */
function getVenueRequestAction() {
    return {
        type: GET_VENUE_REQUESTED,
        isFetching: true,
        status: 'fetching'
    }; 
}

/**
 * Action to be dispatched when the request for venues from FireBase is rejected
 * @return {Object}
 */
function getVenueRejectedAction() {
    return {
        type: GET_VENUES_REJECTED,
        isFetching: false,
        status: 'error'
    };
}

/**
 * Action to be dispatched when the request for venues from FireBase is resolved/fullfilled
 * @param {object} venue - venue obj is returned in the Thunk before this action is dispatched
 * @return {Object}
 */
function getVenueFulfilledAction(venue) {
    return {
        type: GET_VENUES_FULFILLED,
        isFetching: false,
        status: 'success',
        venues: venue
    };
}

/**
 * HomeFeed Async Action Creator (Thunk)
 * @return {Object}
 */

/**
 * Redux Thunk is used in the store as middleware. 
 * It allows us to write action creators that return a function rather than a plain action object.
 * This is perfect so that we can return functions that dispatch our action creators 
 * and request data from our FireBase database. 
 * @type {promise}
 */

 /* 
 By calling store.dispatch(action), the redux store will pass 
 the current state tree & the action object that was
 dispatched to the root reducer.
 
 The root reducer will update the state based 
 on the action that is dispatched and return the 
 updated state back to the store. 
 
 This will call setState(), with wil cause a render() and update props if 
 react-redux bindings have been used (mapStateToProps)
 */

export function getVenue() {
    // Thunk middleware knows how to handle returning functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return function (dispatch) {
        // First dispatch: the state is updated to inform
        // that the API call is starting.
        dispatch(getVenueRequestAction());

        // Next return the /items data from FireBase. 
        // When the data is returned (the promise fulfilled), 
        // assign the  to object to the 'venue' const
        // and dispatch the next action.
        return database.ref('/item').once('value', snap => {
            const venue = snap.val();

            // GetVenueFulfilled action creator requires a param 'venue'
            // We pass it 'venue' and dispatch it, to update the store
            // and thus the state.
            dispatch(getVenueFulfilledAction(venue));
        })
        // If there is an error, the promise will be rejected 
        // and the getVenueRajectiedAction will be dispatched 
        .catch((error) => {
            console.log(error);
            dispatch(getVenueRejectedAction());
        });
    };
}  