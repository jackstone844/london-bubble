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
 the current state tree & the action object that was
 dispatched to the root reducer.
 
 The root reducer will update the state based 
 on the action that is dispatched and return the 
 updated state back to the store. 
 
 This will call render() and update props if 
 react-redux bindings have been used (mapStateToProps)
 */

export function getVenue() {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return (dispatch) => {
        // First dispatch: the state is updated to inform
        // that the API call is starting.
        dispatch(getVenueRequestAction());

        // Next return the /items data from FireBase. 
        // when the data is returned, assigned it to venue
        // and dispatch the next action, passing the venue var 
        // as an arg. This will update th app state 
        return database.ref('/item').once('value', snap => {
            const venue = snap.val();

            // Here, we update the app state with the results of the API call.
            dispatch(getVenueFulfilledAction(venue));
        })
        .catch((error) => {
            console.log(error);
            dispatch(getVenueRejectedAction());
        });
    };
}  