import database from '../firebase.config.js';
import {
    GET_VENUE_REQUESTED,
    GET_VENUES_REJECTED,
    GET_VENUES_FULFILLED
} from '../constants/ActionTypes.js';

/* HomeFeed Action Creators */

/**
 * Action to request venues from FireBase
 * 
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
 * Action if request is rejected
 * 
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
 * Action if request is fulfilled
 * 
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
 * Thunk function to dispatch the Action Creators
 * 
 * @return {Object}
 */

 /* 
 By calling dispatch(action), the redux store will pass 
 the current state tree and the action object that was
 dispatched to the root reducer, in this case, the root 
 reducer only has the getReducer function
 */


export function getVenue() {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return dispatch => {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(getVenueRequestAction());
        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.
        return database.ref('/item').once('value', snap => {
            const venue = snap.val();
            // We can dispatch many times!
            // Here, we update the app state with the results of the API call.
            dispatch(getVenueFulfilledAction(venue));
        })
        .catch((error) => {
            console.log(error);
            dispatch(getVenueRejectedAction());
        });
    };
}  